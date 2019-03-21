using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class HepatitisPerinatalExt
    {
        public int IdCase { get; set; }
        public string InMotherUsa { get; set; }
        public string InPrenatalCare { get; set; }
        public string InHbsagBeforeDelivery { get; set; }
        public string InHbsagAfterDelivery { get; set; }
        public DateTime? DtHbsagPositive { get; set; }
        public DateTime? DtDelivery { get; set; }
        public string InNbrDoses { get; set; }
        public DateTime? DtDose1 { get; set; }
        public DateTime? DtDose2 { get; set; }
        public DateTime? DtDose3 { get; set; }
        public string InChildRcvdHbig { get; set; }
        public DateTime? DtChildRcvdHbig { get; set; }
        public DateTime? DtHbsag { get; set; }
        public string InHbsag { get; set; }
        public DateTime? DtHbs { get; set; }
        public string InHbs { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdMotherCountry { get; set; }
    }
}
