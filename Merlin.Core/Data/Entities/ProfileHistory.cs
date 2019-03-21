using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ProfileHistory
    {
        public int IdProfile { get; set; }
        public DateTime DtAdded { get; set; }
        public string InHistory { get; set; }
        public string NmFirst { get; set; }
        public string NmLast { get; set; }
        public string NmMiddle { get; set; }
        public string NmMaiden { get; set; }
        public string NmSuffix { get; set; }
        public string DsAddr1Name { get; set; }
        public string DsAddr2 { get; set; }
        public string DsCity { get; set; }
        public string CdState { get; set; }
        public string DsZip { get; set; }
        public string CdCounty { get; set; }
        public string IdAdded { get; set; }
        public string CdCountry { get; set; }
        public string InUsAddress { get; set; }
        public string DsReason { get; set; }
        public double? AmLatitude { get; set; }
        public double? AmLongitude { get; set; }
        public byte? InAddressValidated { get; set; }
        public string DsAccumailMsg { get; set; }
        public string DsRawAddress { get; set; }
        public int IdProfileHistory { get; set; }

        public EpiProfile IdProfileNavigation { get; set; }
    }
}
