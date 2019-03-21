using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class MeningitisExtHflue
    {
        public int IdCase { get; set; }
        public string InSentToStateLab { get; set; }
        public string CdSerotype { get; set; }
        public string DsSerotypeOther { get; set; }
        public string InHaemoFlue { get; set; }
        public DateTime? DtHflueDose1 { get; set; }
        public string CdVaccineDose1 { get; set; }
        public string DsOtherVac1 { get; set; }
        public string DsLotNbrDose1 { get; set; }
        public DateTime? DtHflueDose2 { get; set; }
        public string CdVaccineDose2 { get; set; }
        public string DsOtherVac2 { get; set; }
        public string DsLotNbrDose2 { get; set; }
        public DateTime? DtHflueDose3 { get; set; }
        public string CdVaccineDose3 { get; set; }
        public string DsOtherVac3 { get; set; }
        public string DsLotNbrDose3 { get; set; }
        public DateTime? DtHflueDose4 { get; set; }
        public string CdVaccineDose4 { get; set; }
        public string DsOtherVac4 { get; set; }
        public string DsLotNbrDose4 { get; set; }
        public string InAmpicillin { get; set; }
        public string InChloramph { get; set; }
        public string InRifampin { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
