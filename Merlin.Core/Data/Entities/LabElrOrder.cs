using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class LabElrOrder
    {
        public int IdKey { get; set; }
        public int? OrderKey { get; set; }
        public int? IdLab { get; set; }
        public string OrderCode { get; set; }
        public string OrderDescription { get; set; }
        public string OrderAlternateCode { get; set; }
        public string OrderAlternateDescription { get; set; }
        public string OrderIcd9codes { get; set; }
        public DateTime? SpecimenCollectedDateTime { get; set; }
        public DateTime? OrderRequestedDateTime { get; set; }
        public DateTime? SpecimenReceivedDateTime { get; set; }
        public string OrderStatus { get; set; }
        public DateTime? MessageDateTime { get; set; }
    }
}
