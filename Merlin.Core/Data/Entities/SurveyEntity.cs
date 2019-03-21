using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SurveyEntity
    {
        public SurveyEntity()
        {
            SurveyEntityAttribute = new HashSet<SurveyEntityAttribute>();
        }

        public int IdAnswer { get; set; }
        public string NmEntity { get; set; }

        public SurveyAnswers IdAnswerNavigation { get; set; }
        public ICollection<SurveyEntityAttribute> SurveyEntityAttribute { get; set; }
    }
}
