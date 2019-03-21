using Isf.Core.Cqrs;
using Merlin.Core.Data.Services;
using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SurveyQuestionBank : IHaveUID,IAuditAdded,IAuditChanged
    {
        public Guid UID { get; set; }
        public string IdQuestion { get; set; }
        public string CdQuestionType { get; set; }
        public string DsQuestion { get; set; }
        public string CdCodeType { get; set; }
        public DateTime? DtExpired { get; set; }
        public bool InBankQuestion { get; set; }
        public bool InAnswered { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public ICollection<SurveyObjectMapping> SurveyObjectMapping { get; set; }
    }
}
