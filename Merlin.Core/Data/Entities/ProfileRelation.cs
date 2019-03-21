using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ProfileRelation
    {
        public int Id { get; set; }
        public int IdProfileMaster { get; set; }
        public int IdProfileRelated { get; set; }
        public int AmDistance { get; set; }
        public string CdType { get; set; }
        public string IdConfirmed { get; set; }
        public DateTime? DtConfirmed { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public EpiProfile IdProfileMasterNavigation { get; set; }
        public EpiProfile IdProfileRelatedNavigation { get; set; }
    }
}
