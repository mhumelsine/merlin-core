using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class QuestionValidation
    {
        public int Id { get; set; }
        public int IdQuestion { get; set; }
        public string NmShort { get; set; }
        public int IdValidation { get; set; }
        public int? DsParameter { get; set; }
        public string DsErrNsa { get; set; }

        public SurveyQuestion IdQuestionNavigation { get; set; }
    }
}
