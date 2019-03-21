using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ResourceSetting
    { 
        public int? IdResourceSetting { get; set; }
        public string CdSetting { get; set; }
        public string NmSetting { get; set; } 
        public string DsAddr1Name { get; set; }
        public string DsAddr2 { get; set; }
        public string DsCity { get; set; }
        public string CdState { get; set; }
        public string DsZip { get; set; }
        public string CdCounty { get; set; }
        public string CdCountry { get; set; }
        public string InUsAddress { get; set; }
        public string NmContact { get; set; }
        public string DsPhn { get; set; }
        public DateTime? DtEffective { get; set; }
        public DateTime? DtEnd { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public double? AmLatitude { get; set; }
        public double? AmLongitude { get; set; }
        public byte? InAddressValidated { get; set; }
        public string DsAccumailMsg { get; set; }
        public string DsRawAddress { get; set; }
        public string DsAhcaNumber { get; set; }
    }
}
