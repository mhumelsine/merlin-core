using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class IncomingTestResults
    {
        public int MessageId { get; set; }
        public int TestRequestId { get; set; }
        public string TestType { get; set; }
        public string TestResult { get; set; }
        public string SpecimenId { get; set; }
        public string SpecimenCondition { get; set; }
        public string SpecimenComment { get; set; }
        public DateTime ResultDate { get; set; }
        public DateTime InsertDate { get; set; }
        public DateTime? PickupDate { get; set; }
        public int? MessageStatus { get; set; }
        public DateTime? AccessionDate { get; set; }
    }
}
