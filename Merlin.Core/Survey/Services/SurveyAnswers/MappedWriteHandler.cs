using Dapper;
using Merlin.Data.Services;
using Isf.Core.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;
using Merlin.Core.Data.Services;

namespace Merlin.Core.Survey.Services
{
    internal class MappedWriteHandler : COR<SurveyAnswerWriteContext>
    {
        private readonly DataServices dataServices;

        public MappedWriteHandler(DataServices dataServices)
        {
            this.dataServices = dataServices;
        }

        protected override bool CanHandle(SurveyAnswerWriteContext context)
        {
            //see if current key has a mapping
            return context.QuestionStorageMap.ContainsKey(context.Delta.Key.ToUpper());
        }

        protected async override Task HandleInnerAsync(SurveyAnswerWriteContext context)
        {
            var mapping = context.QuestionStorageMap[context.Delta.Key];

            //get the PK
            var keyColumns = await dataServices.GetPksForTableAsync(mapping.TableName);

            var param = new Dictionary<string, object>();

            param["value"] = context.Delta.Incoming;

            //currently merlin only updates so assume this is an update
            string sql = $"update dbo.{mapping.TableName} set {mapping.ColumnName} = @value where 1=1";

            foreach (var column in keyColumns)
            {
                context.SetParameterValue(column, param);

                sql = $"{sql} and {column} = @{column}";
            }

            await context.Connection.ExecuteAsync(sql, param, 1, context.Transaction);
        }        
    }
}
