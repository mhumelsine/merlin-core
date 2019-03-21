using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EnvDatasharingCase
    {
        public EnvDatasharingCase()
        {
            EnvDatasharingCaseSymptoms = new HashSet<EnvDatasharingCaseSymptoms>();
            EnvDatasharingLab = new HashSet<EnvDatasharingLab>();
        }

        public int IdCase { get; set; }
        public string CdImported { get; set; }
        public string CdStatus { get; set; }
        public string CdCountyOrig { get; set; }
        public DateTime? DtCaseAdded { get; set; }
        public DateTime? DtOnset { get; set; }
        public DateTime? DtReported { get; set; }
        public string CdIcd9 { get; set; }
        public string CdDxStatus { get; set; }
        public string CdOutcome { get; set; }
        public string CdInvestigator { get; set; }
        public DateTime? DtBirth { get; set; }
        public DateTime? DtDeath { get; set; }
        public string CdEthnicity { get; set; }
        public string CdGender { get; set; }
        public string DsPhnHome { get; set; }
        public string DsPhnWork { get; set; }
        public string NmLast { get; set; }
        public string NmFirst { get; set; }
        public string DsProfileNotes { get; set; }
        public string CdRace { get; set; }
        public string IdSsn { get; set; }
        public string DsHomeAddr { get; set; }
        public string DsHomeZip { get; set; }
        public string DsHomeCity { get; set; }
        public string DsHomeState { get; set; }
        public string CdHomeCounty { get; set; }
        public string NmResource { get; set; }
        public string DsResourcePhone { get; set; }
        public DateTime? DtInserted { get; set; }
        public DateTime? DtPicked { get; set; }

        public ICollection<EnvDatasharingCaseSymptoms> EnvDatasharingCaseSymptoms { get; set; }
        public ICollection<EnvDatasharingLab> EnvDatasharingLab { get; set; }
    }
}
