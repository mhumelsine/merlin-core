using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class LabTestType
    {
        public string CdLabTest { get; set; }
        public string CdTestType { get; set; }
        public string DsFieldName { get; set; }
        public string CdLabType { get; set; }
        public bool? InDisplay { get; set; }
    }
}
