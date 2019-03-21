using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class MeningococcalExt
    {
        public int IdCase { get; set; }
        public string InSentToStateLab { get; set; }
        public string CdSerogroupHist { get; set; }
        public string DsSerogroupOtherHist { get; set; }
        public string InSulfa { get; set; }
        public string InRifampin { get; set; }
        public string InAttendingCollege { get; set; }
        public string InMeningococcalVaccine { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdCaseLevelSerogroup { get; set; }
    }
}
