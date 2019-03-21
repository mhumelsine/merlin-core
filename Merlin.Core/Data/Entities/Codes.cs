using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Codes
    {
        public Codes()
        {
            UserRegion = new HashSet<UserRegion>();
            UserRole = new HashSet<UserRole>();
        }

        public string CdType { get; set; }
        public string CdValue { get; set; }
        public string DsDesc { get; set; }
        public string DsAssociation { get; set; }
        public DateTime? DtExpired { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtChanged { get; set; }
        public string IdChanged { get; set; }
        public int? IdSequence { get; set; }
        public string CdCdc { get; set; }
        public string DsElement { get; set; }
        public string InOfInterest { get; set; }
        public string CdPhinType { get; set; }
        public string CdPhinValue { get; set; }
        public int Id { get; set; }

        public ICollection<UserRegion> UserRegion { get; set; }
        public ICollection<UserRole> UserRole { get; set; }
    }
}
