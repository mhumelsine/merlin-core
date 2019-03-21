using Dapper;
using Isf.Core.Utils;
using Merlin.Core.Data.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    internal class MappedReadHandler : COR<SurveyAnswerReadContext>
    {
        private readonly DataServices dataServices;

        public MappedReadHandler(DataServices dataServices)
        {
            this.dataServices = dataServices;
        }

        protected override bool CanHandle(SurveyAnswerReadContext context)
        {
            return context.QuestionStorageMap.ContainsKey(context.CurrentKey);
        }

        protected override async Task HandleInnerAsync(SurveyAnswerReadContext context)
        {
            var mapping = context.QuestionStorageMap[context.CurrentKey];

            //get the PK          
            var keyColumns = await dataServices.GetPksForTableAsync(mapping.TableName);

            var param = new Dictionary<string, object>();

            string sql = $"select {mapping.ColumnName} from dbo.{mapping.TableName} where 1=1";

            foreach (var column in keyColumns)
            {
                context.SetParameterValue(column, param);

                sql = $"{sql} and {column} = @{column}";
            }

            var value = await context.Connection.QuerySingleAsync<string>(sql, param);

            context.Answers[context.CurrentKey] = value;
        }
    }
}
