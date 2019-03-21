using Merlin.Core.Data;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Data.Services;
using Merlin.Core.Exceptions;
using Merlin.Core.Survey.Commands;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Merlin.Core.Survey.Services
{
    public class QuestionService
    {
        private readonly MerlinWriteContext writeContext;
        private readonly IConfiguration config;
        private readonly ISequenceGenerator sequenceGenerator;

        public QuestionService(MerlinWriteContext writeContext, IConfiguration config, ISequenceGenerator sequenceGenerator)
        {
            this.writeContext = writeContext;
            this.config = config;
            this.sequenceGenerator = sequenceGenerator;
        }

        public async Task<string> Execute(CreateQuestion command)
        {
            var nextQuestionSequence = await sequenceGenerator.GetNextAsync(SequenceType.SurveyQuestionBank);

            string questionId = $"{config["EnvironmentName"][0]}{nextQuestionSequence}";

            var question = new SurveyQuestionBank
            {
                UID = Guid.NewGuid(), //remove
                IdQuestion = questionId,
                DsQuestion = command.QuestionText,
                CdQuestionType = command.QuestionType,
                CdCodeType = command.CodeType,
                InBankQuestion = command.SaveToBank,
                InAnswered = false,
                DtAdded = DateTime.Now,
                IdAdded = command.UserId
            };

            await writeContext.SurveyQuestionBank.AddAsync(question);
            await writeContext.SaveChangesAsync();

            return questionId;

        }

        public async Task Execute(UpdateQuestion command)
        {
            var existingQuestion = await writeContext.SurveyQuestionBank
                .FindAsync(command.QuestionId);
            
            if(existingQuestion == null)
            {
                throw new EntityNotFoundException(typeof(SurveyQuestionBank), command.QuestionId);
            }            

            existingQuestion.DsQuestion = command.QuestionText;
            existingQuestion.CdQuestionType = command.QuestionType;
            existingQuestion.CdCodeType = command.CodeType;
            existingQuestion.InBankQuestion = command.SaveToBank;
            existingQuestion.IdChanged = command.UserId;
            existingQuestion.DtChanged = DateTime.Now;
            
                await writeContext.SaveChangesAsync();
        }
    }
}
