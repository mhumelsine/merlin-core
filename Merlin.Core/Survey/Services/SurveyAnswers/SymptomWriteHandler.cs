using Dapper;
using Merlin.Core.Case;
using Merlin.Data.Services;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    internal class SymptomWriteHandler : SurveyWriteHandler
    {

        public SymptomWriteHandler()
            : base(SurveyControlType.Symptoms)
        {

        }
        protected async override Task HandleInnerAsync(SurveyAnswerWriteContext context)
        {
            //we should only see the symptoms that have changed so this should be update vs. delete
            var existingSymptom = context.Delta.Current as CaseSymptomDto;
            var incomingSymptom = context.Delta.Incoming as CaseSymptomDto;

            bool shouldDelete = existingSymptom.HasSymptom && !incomingSymptom.HasSymptom;

            if (incomingSymptom.HasSymptom)
            {
                //update, no audit field for updated id/timestamp
                await context.Connection.ExecuteAsync(
                    @"update dbo.case_symptom 
                       set dt_onset = @onsetDate,
                            ds_symptom_other = @other,
                            am_onset_time = @onsetTime
                        where ID_CASE = @caseId and CD_SYMPTOM = @symptom

                    if @@rowcount = 0
                    begin
                        insert into dbo.case_symptom(id_case, cd_symptom, dt_onset, ds_symptom_other, am_onset_time,id_added, dt_added)
                            values(@caseId,@symptom,@onsetDate,@other,@onsetTime,@userId,@timestamp)
                    end",
                    new
                    {
                        incomingSymptom.OnsetDate,
                        incomingSymptom.OnsetTime,
                        context.UserId,
                        context.Timestamp,
                        context.CaseId,
                        symptom = incomingSymptom.SymptomCode,
                        incomingSymptom.Other
                    }, 1, context.Transaction);
            }

            if(shouldDelete)
            {
                //delete
                await context.Connection.ExecuteAsync(
                    "delete from dbo.case_symptom where ID_CASE = @caseId and CD_SYMPTOM = @symptom",
                    new
                    {
                        caseId = context.CaseId,
                        symptom = incomingSymptom.SymptomCode
                    }, 1, context.Transaction);
            }
        }

    }
}
