using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiCaseContacts
    {
        public int IdCaseContact { get; set; }
        public int IdCase { get; set; }
        public string DsContactName { get; set; }
        public int? AmAge { get; set; }
        public string CdGender { get; set; }
        public DateTime? DtOnset { get; set; }
        public string CdContactType { get; set; }
        public string InSensitiveSituation { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdDxStatus { get; set; }
        public string DsContactTypeMovedOut { get; set; }
        public string InGetSick { get; set; }
        public string DsAddr1 { get; set; }
        public string DsAddr2 { get; set; }
        public string DsCity { get; set; }
        public string CdState { get; set; }
        public string DsZip { get; set; }
        public string CdCounty { get; set; }
        public string DsPhnHome { get; set; }
        public string DsPhnWork { get; set; }
        public DateTime? DtBirth { get; set; }
        public string CdRace { get; set; }
        public string CdEthnicity { get; set; }
        public DateTime? DtStart { get; set; }
        public DateTime? DtEnd { get; set; }
        public string InConfirmedCase { get; set; }
        public string DsNotes { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
