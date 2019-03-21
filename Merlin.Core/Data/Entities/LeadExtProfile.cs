using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class LeadExtProfile
    {
        public int IdCase { get; set; }
        public int IdProfile { get; set; }
        public string NmAlias { get; set; }
        public string CdRelation { get; set; }
        public string DsRelationOther { get; set; }
        public short? InYearResBuilt { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdOriginCountry { get; set; }
        public string CdLanguage1 { get; set; }
        public string CdLanguage2 { get; set; }
        public string NmGuardian { get; set; }
        public byte? InForeignBorn { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
