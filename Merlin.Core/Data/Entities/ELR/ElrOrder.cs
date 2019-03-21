using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ElrOrder
    {
        public ElrOrder()
        {
            ElrObservation = new HashSet<ElrObservation>();
        }

        public int OrderKey { get; set; }
        public int RequestKey { get; set; }
        public string OrderId { get; set; }
        public string ParentOrderId { get; set; }
        public string PlacerOrderId { get; set; }
        public string OrderCode { get; set; }
        public string OrderDescription { get; set; }
        public string OrderType { get; set; }
        public string OrderAlternateCode { get; set; }
        public string OrderAlternateDescription { get; set; }
        public string OrderAlternateType { get; set; }
        public string OrderIcd9codes { get; set; }
        public string SpecimenId { get; set; }
        public string SpecimenTypeCode { get; set; }
        public string SpecimenTypeName { get; set; }
        public DateTime? OrderRequestedDateTime { get; set; }
        public DateTime? SpecimenCollectedDateTime { get; set; }
        public DateTime? SpecimenReceivedDateTime { get; set; }
        public string SpecimenTransportMode { get; set; }
        public string SpecimenTransportId { get; set; }
        public string OrderStatus { get; set; }
        public int Doiflag { get; set; }
        public int? Supercedes { get; set; }
        public int? SupercededBy { get; set; }
        public DateTime InsertedDateTime { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public int IsDeleted { get; set; }
        public string ProgramComponent { get; set; }
        public string MerlinSpecimenCode { get; set; }
        public string Hl7specimenTypeCode { get; set; }
        public string Hl7specimenTypeName { get; set; }
        public string ParentResult { get; set; }
        public string DemographicUpdateFlag { get; set; }
        public string DsFluHeader { get; set; }
        public DateTime? DtLabEvent { get; set; }
        public short? AmAge { get; set; }
        public int? Spmkey { get; set; }
        public string PlacerNumber { get; set; }
        public string FillerNumber { get; set; }
        public string ParentPlacerNum { get; set; }
        public string ParentFillerNum { get; set; }
        public string SterileSource { get; set; }
        public string DsRsvHeader { get; set; }

        public ElrRequest RequestKeyNavigation { get; set; }
        public ICollection<ElrObservation> ElrObservation { get; set; }
    }
}
