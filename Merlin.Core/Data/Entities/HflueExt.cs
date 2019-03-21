using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class HflueExt
    {
        public int IdCase { get; set; }
        public string InSentToStateLab { get; set; }
        public string CdSerotype { get; set; }
        public string DsSerotypeOther { get; set; }
        public string InHaemoFlue { get; set; }
        public string InAmpicillin { get; set; }
        public string InChloramph { get; set; }
        public string InRifampin { get; set; }
        public string InVaccinationHistory { get; set; }
        public string DsSourceInformation { get; set; }
        public string DsOtherSourceInf { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string InVerify { get; set; }
        public string DsVerifySource { get; set; }
        public string DsOtherVerifySource { get; set; }
        public string CdBiotype { get; set; }
    }
}
