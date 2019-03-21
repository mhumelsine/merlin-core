using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EharsProfile
    {
        public int Id { get; set; }
        public Guid IdHash { get; set; }
        public string DsStateno { get; set; }
        public string NmFirst { get; set; }
        public string NmMiddle { get; set; }
        public string NmLast { get; set; }
        public string NmSuffix { get; set; }
        public string NmAkaFirst { get; set; }
        public string NmAkaLast { get; set; }
        public long? IdSsn { get; set; }
        public DateTime? DtBirth { get; set; }
        public string CdGender { get; set; }
        public string CdRace { get; set; }
        public string DsCob { get; set; }
        public string DsVitalStatus { get; set; }
        public string DtDeath { get; set; }
        public string DsStatus { get; set; }
        public DateTime? DtHivDx { get; set; }
        public string DsTransCategory { get; set; }
        public string DsDistrictHiv { get; set; }
        public string DsDistrictAids { get; set; }
        public string IdPrisno { get; set; }
        public string DsViralLoadFirst { get; set; }
        public string DsViralLoadLast { get; set; }
        public string DsCd4First { get; set; }
        public string DsCd4Last { get; set; }
        public string DsDtAkaBirth { get; set; }
        public string DsDtHivDx { get; set; }
        public string DsDtAidsDx { get; set; }
        public string DsDtViralLoadFirst { get; set; }
        public string DsDtViralLoadLast { get; set; }
        public string DsDtCd4First { get; set; }
        public string DsDtCd4Last { get; set; }
    }
}
