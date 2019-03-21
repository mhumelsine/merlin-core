using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiCaseFlatfile
    {
        public int IdCase { get; set; }
        public string CdRecordType { get; set; }
        public int AmYear { get; set; }
        public string CdCdc { get; set; }
        public string DsCdcData { get; set; }
        public bool? InUpdatable { get; set; }
        public string CdIcd9 { get; set; }
        public string DsCdcExtdData { get; set; }
        public string InUnkTaskList { get; set; }
        public byte? InCdcNotify { get; set; }
    }
}
