using Merlin.Core.Data;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Survey.Dtos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Merlin.Core.Survey.Services
{
    internal class SurveyAnswerReadContext
    {
        public MerlinReadContext DB { get; set; }
        public string CurrentKey { get; set; }
        public LayoutItemDto CurrentItem { get; set; }
        public int? CaseId { get; set; }
        public int? ProfileId { get; set; }
        public int? OutbreakId { get; set; }
        public int SurveyInstanceId { get; set; }
        public Dictionary<string, object> Answers { get; set; }
        public IDbConnection Connection { get; set; }
        public IDictionary<string, SurveyObjectMapping> QuestionStorageMap { get; set; }
        public bool IsSingle { get { return Answers[CurrentKey] is string; } }

        public void SetAnswer(object answer)
        {
            Answers[CurrentKey] = answer;
        }

        public void SetAnswer(object answer, string questionId, int questionSubId)
        {
            Answers[questionId + "-" + questionSubId.ToString()] = answer;
        }

        public void SetParameterValue(string keyColumn, IDictionary<string, object> param)
        {
            switch (keyColumn)
            {
                case "ID_CASE":
                    param[keyColumn] = CaseId;
                    return;
                case "ID_PROFILE":
                    param[keyColumn] = ProfileId;
                    return;
                default:
                    throw new InvalidOperationException(
                        $"No value can be found for '{keyColumn}'");
            }
        }
    }
}
