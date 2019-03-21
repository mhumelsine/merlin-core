using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutgoingTestRequests
    {
        public int MessageId { get; set; }
        public string PatientId { get; set; }
        public string SpecimenSource { get; set; }
        public string TestRequestId { get; set; }
        public string TestType { get; set; }
        public DateTime? SpecimenCollectionDate { get; set; }
        public string SpecimenType { get; set; }
        public string OrderingProviderId { get; set; }
        public string OrderingProviderName { get; set; }
        public string OrderingProviderStreet1 { get; set; }
        public string OrderingProviderStreet2 { get; set; }
        public string OrderingProviderCity { get; set; }
        public string OrderingProviderState { get; set; }
        public string OrderingProviderZip { get; set; }
        public string OrderingProviderCounty { get; set; }
        public string SpecimenCarrier { get; set; }
        public string SpecimenTrackingNumber { get; set; }
        public string BranchLab { get; set; }
        public int? MessageStatus { get; set; }
        public string StatusComment { get; set; }
        public DateTime InsertDate { get; set; }
        public DateTime? PickupDate { get; set; }
    }
}
