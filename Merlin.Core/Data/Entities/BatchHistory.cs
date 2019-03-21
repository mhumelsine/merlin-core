using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class BatchHistory
    {
        public int Id { get; set; }
        public string BatchType { get; set; }
        public DateTime DtRun { get; set; }
        public string IsSuccess { get; set; }
        public string DsError { get; set; }
        public int? RunLength { get; set; }
    }
}
