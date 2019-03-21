using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakSettings
    {
        public int IdOutbreak { get; set; }
        public short IdSetting { get; set; }
        public string CdSetting { get; set; }
        public string DsRelationOutbreak { get; set; }
        public string NmFacility { get; set; }
        public string DsAddress { get; set; }
        public string DsCity { get; set; }
        public string DsZip { get; set; }
        public string CdCounty { get; set; }
        public string CdState { get; set; }
        public string NmContact { get; set; }
        public string DsContactPhn { get; set; }
        public DateTime? DtClosed { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsComments { get; set; }
        public string CdCountry { get; set; }
        public string DsSettingOther { get; set; }
        public bool? InPrimary { get; set; }
        public string DsAddress2 { get; set; }
        public string InUsAddress { get; set; }
        public int? IdResourceSetting { get; set; }
        public Outbreak IdOutbreakNavigation { get; set; }
    }
}
