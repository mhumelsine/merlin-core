using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Snomed
    {
        public string CdSnomed { get; set; }
        public string CdIcd9 { get; set; }
        public string DsSnomed { get; set; }
        public string DsGenus { get; set; }
        public string CdSpecies { get; set; }
        public string CdSubspecies { get; set; }
        public string CdSerovar { get; set; }
        public string CdBiovar { get; set; }
        public string CdVar { get; set; }
        public string CdSerotype { get; set; }
        public string CdBiotype { get; set; }
        public string CdType { get; set; }
        public string CdSerogroup { get; set; }
        public string CdBiogroup { get; set; }
        public string CdGroup { get; set; }
        public string CdStrain { get; set; }
        public string CdDescriptor { get; set; }
        public string CdResistance { get; set; }
        public int? IdPanel { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public DateTime? DtExpired { get; set; }
        public byte? InDoiflag { get; set; }
        public string CdResult { get; set; }
        public string CdFluHeader { get; set; }
        public string CdRsvHeader { get; set; }
        public string InIncludeOnAmr { get; set; }
    }
}
