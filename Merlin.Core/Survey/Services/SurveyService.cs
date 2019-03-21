using Isf.Core.Utils;
using Merlin.Core.Data;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Data.Services;
using Merlin.Core.Exceptions;
using Merlin.Core.Survey.Commands;
using Merlin.Core.Survey.Queries;
using Merlin.Data.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    public class SurveyService
    {
        private readonly MerlinWriteContext writeContext;
        private readonly SurveyAnswerRepository repos;
        private readonly DataServices dataServices;
        private readonly ISequenceGenerator sequencerGenerator;
        private readonly IUsernameProvider usernameProvider;

        public SurveyService(MerlinWriteContext writeContext, ISequenceGenerator sequencerGenerator, SurveyAnswerRepository repos, IUsernameProvider usernameProvider, DataServices dataServices)
        {
            this.writeContext = writeContext;
            this.sequencerGenerator = sequencerGenerator;
            this.repos = repos;
            this.usernameProvider = usernameProvider;
            this.dataServices = dataServices;
        }

        public async Task Execute(AttachSurveys command)
        {
            HashSet<Data.Survey> surveysToAdd = new HashSet<Data.Survey>();

            foreach (var icd9 in command.ICD9Code)
            {
                surveysToAdd.Add(new Data.Survey
                {
                    IdSurvey = (int)await sequencerGenerator.GetNextAsync(SequenceType.Survey),
                    UID = Guid.NewGuid(),
                    CdIcd9 = icd9,
                    IdSurveyVersion = 1,
                    CdSurveyType = command.SurveyType,
                    DtEffective = command.EffectiveDate,
                    UidLayout = command.LayoutId,
                    NmSurvey = command.Name
                });
            }

            foreach (var outbreakId in command.OutbreakId)
            {
                surveysToAdd.Add(new Data.Survey
                {
                    IdSurvey = (int)await sequencerGenerator.GetNextAsync(SequenceType.Survey),
                    UID = Guid.NewGuid(),
                    IdOutbreak = outbreakId,
                    CdSurveyType = command.SurveyType,
                    DtEffective = command.EffectiveDate,
                    IdSurveyVersion = 1,
                    UidLayout = command.LayoutId,
                    NmSurvey = command.Name
                });
            }

            await writeContext.Survey.AddRangeAsync(surveysToAdd);
            await writeContext.SaveChangesAsync();
        }

        public async Task Execute(SaveSurveyAnswers command)
        {
            var questionStorageMap = await repos.GetQuestionStorageMap(command.SurveyId);

            var currentAnswers = await repos.Get(new GetSurveyAnswers
            {
                CaseId = command.CaseId,
                SurveyId = command.SurveyId,
                ProfileId = command.ProfileId,
                OutbreakId = command.OutbreakId
            });

            //unwrap jArrays to complex types
            SurveyAnswerBindingHelpers.Bind(command.Answers);

            var answers = command.Answers.ToDictionary(entry => entry.Key.ToUpper(), entry => entry.Value);

            //get only the differences
            var deltas = SurveyAnswerHelpers.GetDeltas(currentAnswers, answers);

            //if no delta, exit
            if (!deltas.Any())
            {
                return;
            }

            var writer = COR<SurveyAnswerWriteContext>.CreateChain(
                new SymptomWriteHandler(),
                new TravelHistoryWriteHandler(),
                new MappedWriteHandler(dataServices),
                new RepeaterWriteHandler(),
                new MultipleWriteHandler(),
                new DefaultWriteHandler());

            var allkeys = deltas
                .Select(delta => delta.Key)
                .ToList();

            var storageMapping = writeContext.SurveyObjectMapping
                .Where(mapping => mapping.CdMappingtype == "TARGETDS")
                .Where(mapping => allkeys.Contains(mapping.IdQuestion))
                .ToDictionary(mapping => mapping.IdQuestion.ToUpper());

            var surveyInstanceId = await repos.GetSurveyInstanceId(command.ProfileId, command.CaseId, command.OutbreakId);

            var connection = writeContext.Database.GetDbConnection().EnsureOpen();

            using (var transaction = writeContext.Database.BeginTransaction().GetDbTransaction())
            {
                //TODO:  This needs better DB design
                //if no survey instance, create one
                if (surveyInstanceId == 0)
                {
                    surveyInstanceId = (int)await sequencerGenerator.GetNextAsync(SequenceType.SurveyInstance);

                    var instance = new SurveyInstance
                    {
                        IdSurveyInstance = surveyInstanceId.Value,
                        IdProfile = command.ProfileId,
                    };

                    if (command.OutbreakId != null)
                    {
                        instance.CdEntityType = "O";
                        instance.IdEntity = command.OutbreakId;
                    }

                    if (command.CaseId != null)
                    {
                        instance.CdEntityType = "C";
                        instance.IdEntity = command.CaseId;
                    }

                    await writeContext.SurveyInstance.AddAsync(instance);
                    await writeContext.SaveChangesAsync();
                }
                //end

                var context = new SurveyAnswerWriteContext
                {
                    DB = writeContext,
                    CaseId = command.CaseId,
                    ProfileId = command.ProfileId,
                    OutbreakId = command.OutbreakId,
                    SurveyInstanceId = surveyInstanceId.Value, //should be assigned a value by this point
                    UserId = usernameProvider.GetUsername(),
                    Timestamp = DateTime.Now,
                    QuestionStorageMap = questionStorageMap
                };

                context.Transaction = transaction;
                context.Connection = connection;

                //apply the changes
                foreach (var delta in deltas)
                {
                    context.Delta = delta;

                    await writer.HandleAsync(context);

                    //need to mark question as answered
                    if (SurveyAnswerBindingHelpers.IsQuestion(delta.Key))
                    {

                        var param = new
                        {
                            questionId = delta.Key
                        };
                        try
                        {
                            string sql = @"update survey_question_bank
                                set IN_ANSWERED = 1
                                where id_question = @questionId
                                and IN_ANSWERED = 0;";

                            await connection.ExecuteAsync(sql, param, 1, transaction);
                        }
                        catch (Exception e)
                        {
                            //do nothing for now
                        }


                    }
                }
                transaction.Commit();
            }
        }

        public async Task Execute(CreateSurveyFromTemplate command)
        {
            var surveyToClone = await writeContext.Survey
                .AsNoTracking()
                .SingleOrDefaultAsync(survey => survey.IdSurvey == command.SurveyIdToClone);

            if(surveyToClone == null)
            {
                throw new EntityNotFoundException(typeof(Data.Survey), command.SurveyIdToClone);
            }

            if(surveyToClone.IdSurveyVersion != 1)
            {
                throw new InvalidOperationException($"Can only clone surveys with survey version 1");
            }

            surveyToClone.IdSurvey = (int)await sequencerGenerator.GetNextAsync(SequenceType.Survey);
            surveyToClone.IdOutbreak = command.OutbreakId;
            surveyToClone.CdSurveyType = command.SurveyType;
            surveyToClone.NmSurvey = command.SurveyName;
            surveyToClone.DtEffective = command.EffectiveDate;

            await writeContext.Survey.AddAsync(surveyToClone);

            await writeContext.SaveChangesAsync();
        }
    }
}
