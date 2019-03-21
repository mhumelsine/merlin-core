using Isf.Core.Cqrs;
using Merlin.Core.Data.Services;
using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SurveyLayout : IHaveUID, IAuditAdded, IAuditChanged
    {
        public SurveyLayout()
        {
            SurveyLayoutQuestion = new HashSet<SurveyLayoutQuestion>();
            SurveyLayoutTag = new HashSet<SurveyLayoutTag>();
            Surveys = new HashSet<Survey>();
        }

        public Guid UID { get; set; }

        public string JsLayout { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string NmLayout { get; set; }
        public ICollection<SurveyLayoutQuestion> SurveyLayoutQuestion { get; set; }
        public ICollection<SurveyLayoutTag> SurveyLayoutTag { get; set; }
        public ICollection<Survey> Surveys { get; set; }
    }
}
