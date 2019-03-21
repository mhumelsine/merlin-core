using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SurveyEntityAttribute
    {
        public int IdAnswer { get; set; }
        public string NmAttribute { get; set; }
        public string DsValue { get; set; }

        public SurveyEntity IdAnswerNavigation { get; set; }
    }
}
