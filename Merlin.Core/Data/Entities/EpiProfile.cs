using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiProfile
    {
        public EpiProfile()
        {
            Assignment = new HashSet<Assignment>();
            Comment = new HashSet<Comment>();
            DeployPerson = new HashSet<DeployPerson>();
            HivCase = new HashSet<HivCase>();
            ProfileHistory = new HashSet<ProfileHistory>();
            ProfileRelationIdProfileMasterNavigation = new HashSet<ProfileRelation>();
            ProfileRelationIdProfileRelatedNavigation = new HashSet<ProfileRelation>();
            Specimen = new HashSet<Specimen>();
        }

        public int IdProfile { get; set; }
        public long? IdSsn { get; set; }
        public short InTwins { get; set; }
        public string NmLast { get; set; }
        public string NmSuffix { get; set; }
        public string NmFirst { get; set; }
        public string NmMiddle { get; set; }
        public string NmMaiden { get; set; }
        public string CdGender { get; set; }
        public DateTime? DtBirth { get; set; }
        public DateTime? DtDeath { get; set; }
        public string CdRace { get; set; }
        public string CdEthnicity { get; set; }
        public string DsNotes { get; set; }
        public string DsPhnHome { get; set; }
        public string DsPhnWork { get; set; }
        public string DsPhnEmerg { get; set; }
        public string NmEmergCon { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string IdAlternate { get; set; }
        public string CdRaceReason { get; set; }
        public string CdEthnicityReason { get; set; }
        public string IdPatient { get; set; }
        public bool? InDobUnknown { get; set; }
        public string DsEmail { get; set; }
        public string IdShots { get; set; }
        public bool InMaster { get; set; }

        public ICollection<Assignment> Assignment { get; set; }
        public ICollection<Comment> Comment { get; set; }
        public ICollection<DeployPerson> DeployPerson { get; set; }
        public ICollection<HivCase> HivCase { get; set; }
        public ICollection<ProfileHistory> ProfileHistory { get; set; }
        public ICollection<ProfileRelation> ProfileRelationIdProfileMasterNavigation { get; set; }
        public ICollection<ProfileRelation> ProfileRelationIdProfileRelatedNavigation { get; set; }
        public ICollection<Specimen> Specimen { get; set; }
    }
}
