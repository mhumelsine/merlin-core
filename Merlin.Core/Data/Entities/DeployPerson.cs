using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class DeployPerson
    {
        public int IdArea { get; set; }
        public int IdLocation { get; set; }
        public int IdPerson { get; set; }
        public int? IdCase { get; set; }
        public int? IdProfile { get; set; }
        public string CdPersonStatus { get; set; }
        public bool? InEligible { get; set; }
        public string CdConsentInterview { get; set; }
        public string CdConsentSpecimen { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string NmFirst { get; set; }
        public string NmLast { get; set; }
        public DateTime? DtBirth { get; set; }
        public string CdGender { get; set; }
        public string CdSuffix { get; set; }
        public string NmMiddle { get; set; }

        public DeployLocation Id { get; set; }
        public EpiCase IdCaseNavigation { get; set; }
        public EpiProfile IdProfileNavigation { get; set; }
    }
}
