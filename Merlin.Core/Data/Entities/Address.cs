using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Address
    {
        public int Id { get; set; }
        public int IdEntity { get; set; }
        public byte IdType { get; set; }
        public bool InCurrent { get; set; }
        public string DsStreet1 { get; set; }
        public string DsStreet2 { get; set; }
        public string DsCity { get; set; }
        public string CdState { get; set; }
        public string CdZip { get; set; }
        public string CdCounty { get; set; }
        public string CdCountry { get; set; }
        public bool InGeocoded { get; set; }
        public double? AmLatitude { get; set; }
        public double? AmLongitude { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public bool InUsAddress { get; set; }
    }
}
