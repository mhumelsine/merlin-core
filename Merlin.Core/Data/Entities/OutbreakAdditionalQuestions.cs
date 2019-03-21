using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakAdditionalQuestions
    {
        public int IdOutbreak { get; set; }
        public int IdQuestion { get; set; }
        public int IdPerson { get; set; }
        public DateTime? DtBegin { get; set; }
        public DateTime? DtEnd { get; set; }
        public string DsLocName { get; set; }
        public string DsLocAddress { get; set; }
        public string DsCity { get; set; }
        public string CdState { get; set; }
        public string DsNotes { get; set; }
        public int IdKey { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
