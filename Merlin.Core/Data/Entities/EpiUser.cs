using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiUser
    {
        public EpiUser()
        {
            UserRegion = new HashSet<UserRegion>();
            UserRole = new HashSet<UserRole>();
        }

        public string IdUser { get; set; }
        public DateTime DtEffective { get; set; }
        public DateTime? DtEnd { get; set; }
        public string NmLastUser { get; set; }
        public string NmFirstUser { get; set; }
        public string CdAccess { get; set; }
        public string DsTitle { get; set; }
        public string CdCounty { get; set; }
        public string DsPhn { get; set; }
        public string DsPhnSuncom { get; set; }
        public string DsComment { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public int? IdLaboratory { get; set; }
        public string DsLoggedIn { get; set; }
        public string DsLockedOut { get; set; }
        public byte DsNoLoginTry { get; set; }
        public string IdSession { get; set; }
        public DateTime? DtPwdReset { get; set; }
        public byte[] DsPassword { get; set; }
        public string DsEmail { get; set; }
        public string InHighPriority { get; set; }
        public bool? InMultipleCounty { get; set; }
        public bool? InMultipleIcd9 { get; set; }
        public string IdNtLogin { get; set; }
        public bool? InDeleteExempt { get; set; }
        public int? IdEpiGateway { get; set; }
        public bool? InEpiReviewer { get; set; }
        public string IdEssence { get; set; }
        public string CdElrPresearch { get; set; }
        public bool? InSsnDisplay { get; set; }
        public DateTime? DtLastLogin { get; set; }
        public bool? InQuery { get; set; }
        public string DsEpicomId { get; set; }
        public int Id { get; set; }
        public int? CdLoginUrl { get; set; }

        public ICollection<UserRegion> UserRegion { get; set; }
        public ICollection<UserRole> UserRole { get; set; }
    }
}
