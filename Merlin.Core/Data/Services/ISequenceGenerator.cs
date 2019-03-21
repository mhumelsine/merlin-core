using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Data.Services
{
    public static class SequenceType
    {
        public const string Survey = "SEQ_SURVEY";
        public const string SurveyInstance = "SEQ_SURVEY_INSTANCE";
        public const string SurveyQuestionBank = "SEQ_SURVEY_QUESTION";
        public const string OutbreakEventId = "SEQ_OUTBREAK_EVENTS";
        public const string EpiDocument = "SEQ_EPI_DOCUMENT";
        public const string OutbreakSettings = "SEQ_OB_SETNG";
        public const string EmailQueue = "SEQ_EMAIL_QUEUE";
    }
    public interface ISequenceGenerator
    {
        Task<long> GetNextAsync(string key);
    }
}
