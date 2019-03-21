using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CaseReportForms
    {
        public int IdCase { get; set; }
        public DateTime? DtReceived { get; set; }
        public string InReviewed { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
