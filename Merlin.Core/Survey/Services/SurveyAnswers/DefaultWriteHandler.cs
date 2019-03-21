using Dapper;
using Merlin.Data.Services;
using Isf.Core.Utils;
using System;
using System.Threading.Tasks;
using System.Collections;
using System.Collections.Generic;

namespace Merlin.Core.Survey.Services
{
    internal class DefaultWriteHandler : COR<SurveyAnswerWriteContext>
    {
        private const string INSERT_SQL =
            @"insert into dbo.survey_answers(id_answer, id_survey_instance, id_question, id_question_sub, id_case, DS_ANSWER, id_added, dt_added) 
            values(next value for dbo.SEQ_SURVEY_ANSWERS, @surveyInstanceId, @questionId, @questionSubId, @caseId, @answer, @userId, @timestamp)";

        protected override bool CanHandle(SurveyAnswerWriteContext context)
        {
            //default handler always handles
            return true;
        }

        protected async override Task HandleInnerAsync(SurveyAnswerWriteContext context)
        {
            //this should only handle single questions
            if (!SurveyAnswerBindingHelpers.IsQuestion(context.Delta.Key))
            {
                return;
            }

            //handle null
            if (context.Delta.Incoming == null)
            {
                await DeleteAnswer(context);
                return;
            }

            await UpsertAnswer(context, context.Delta.Incoming);
        }

        private object GetParameters(SurveyAnswerWriteContext context, object answer)
        {
            return new
            {
                userId = context.UserId,
                timestamp = context.Timestamp,
                answer,
                questionId = context.Delta.Key,
                questionSubId = (int?) null,
                caseId = context.CaseId,
                surveyInstanceId = context.SurveyInstanceId
            };
        }

        private object GetParameters(SurveyAnswerWriteContext context, object answer, string questionId, int questionSubId)
        {
            return new
            {
                userId = context.UserId,
                timestamp = context.Timestamp,
                answer,
                questionId,
                questionSubId,
                caseId = context.CaseId,
                surveyInstanceId = context.SurveyInstanceId
            };
        }

        protected async Task InsertAnswer(SurveyAnswerWriteContext context, object answer)
        {
            var param = GetParameters(context, answer);

            await context.Connection.ExecuteAsync(INSERT_SQL, param, 1, context.Transaction);
        }

        protected async Task InsertAnswer(SurveyAnswerWriteContext context, object answer, string questionId, int index)
        {
            var param = GetParameters(context, answer, questionId, index);

            await context.Connection.ExecuteAsync(INSERT_SQL, param, 1, context.Transaction);
        }

        private async Task UpsertAnswer(SurveyAnswerWriteContext context, object answer, int? index = null)
        {

            var param = GetParameters(context, answer);

            string sql = $@"update survey_answers
                        set DS_ANSWER = @answer
                        , ID_UPDATED = @userId
                        , DT_UPDATED = @timestamp
                        where id_survey_instance = @surveyInstanceId
                        and id_question = @questionId
                        and ((id_question_sub = @questionSubId) or (id_question_sub is null and @questionSubId is null))

                        if @@rowcount = 0
                        begin
                            {INSERT_SQL}
                        end";


            await context.Connection.ExecuteAsync(sql, param, 1, context.Transaction);
        }
        protected async Task DeleteAnswer(SurveyAnswerWriteContext context)
        {
            var param = new
            {
                questionId = context.Delta.Key,
                surveyInstanceId = context.SurveyInstanceId
            };

            string sql = @"delete from dbo.survey_answers where ID_SURVEY_INSTANCE = @surveyInstanceId AND ID_QUESTION = @questionId";


            await context.Connection.ExecuteAsync(sql, param, context.Transaction);
        }
        protected async Task DeleteAnswer(SurveyAnswerWriteContext context, string questionId)
        {
            var param = new
            {
                questionId,
                context.SurveyInstanceId
            };

            string sql = @"delete from dbo.survey_answers where ID_SURVEY_INSTANCE = @surveyInstanceId AND ID_QUESTION = @questionId";


            await context.Connection.ExecuteAsync(sql, param, context.Transaction);
        }
    }
}
