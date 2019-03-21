using Merlin.Core.Case;
using Merlin.Core.Case.Dtos;
using Merlin.Core.Lab.Dtos;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Merlin.Core.Survey.Services
{
    internal static class SurveyControlType
    {
        public const string
            Symptoms = "Symptoms",
            EpiLinks = "Epi-Link Relationships",
            HealthCaseVisists = "Health Care Visits",
            TravelHistory = "Travel History",
            LabResults = "Lab Results",
            LabSummary = "Lab Summary";
    }

    internal static class SurveyAnswerBindingHelpers
    {

        private static Dictionary<string, Type> ControlTypeMapping =
            new Dictionary<string, Type>
            {
                {SurveyControlType.Symptoms, typeof(IList<CaseSymptomDto>) },
                {SurveyControlType.EpiLinks, typeof(IList<EpiLinkDto>) },
                {SurveyControlType.HealthCaseVisists, typeof(IList<HealthCareVisitDto>) },
                {SurveyControlType.TravelHistory, typeof(IList<TravelHistoryDto>) },
                {SurveyControlType.LabResults, typeof(IList<LabResultDto>) },
                {SurveyControlType.LabSummary, typeof(IList<LabSummaryDto>) },
            };

        public static Type GetControlAnswerType(string key)
        {
            if (ControlTypeMapping.TryGetValue(key, out var type))
            {
                return type;
            }
            return null;
        }

        public static bool IsQuestion(string key)
        {
            return Regex.IsMatch(key, @"^[D,S,P,T,U,0-9]\d+$");
        }

        public static bool IsRepeater(string key)
        {
            return Regex.IsMatch(key, @"^RG-.*$");
        }

        public static bool HasMultipleAnswers(object answer)
        {
            return answer is IEnumerable && !(answer is string);
        }

        public static void Bind(IDictionary<string, object> answers)
        {

            foreach (var key in answers.Keys.ToList())
            {
                if (!IsQuestion(key))
                {
                    var jarray = answers[key] as Newtonsoft.Json.Linq.JArray;

                    var type = GetControlAnswerType(key);

                    if (type != null && jarray != null)
                    {
                        answers[key] = jarray.ToObject(type); ;
                    }
                }else
                {
                    if(answers[key] is Newtonsoft.Json.Linq.JArray)
                    {
                        answers[key] = ((Newtonsoft.Json.Linq.JArray)answers[key]).ToObject<List<string>>();
                    }
                }
            }
        }
    }
}
