using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ElrObservation
    {
        public int ObservationKey { get; set; }
        public int OrderKey { get; set; }
        public string ObservationId { get; set; }
        public DateTime? ObservationDateTime { get; set; }
        public string ObservationCode { get; set; }
        public string ObservationType { get; set; }
        public string ObservationName { get; set; }
        public string ObservationAlternateCode { get; set; }
        public string ObservationAlternateName { get; set; }
        public string ObservationAlternateType { get; set; }
        public string ResultType { get; set; }
        public string ResultCode { get; set; }
        public string ResultDescription { get; set; }
        public string ResultCodingSystem { get; set; }
        public string AlternateResultCode { get; set; }
        public string AlternateResultDescription { get; set; }
        public string AlternateResultCodingSystem { get; set; }
        public string ResultNumericComparator { get; set; }
        public string ResultNumericNumber1 { get; set; }
        public string ResultNumericSeparator { get; set; }
        public string ResultNumericNumber2 { get; set; }
        public string ResultNumericSuffix { get; set; }
        public string ReferenceRange { get; set; }
        public string Units { get; set; }
        public string Methodology { get; set; }
        public string AbnormalFlag { get; set; }
        public string ObservationStatus { get; set; }
        public int? Supercedes { get; set; }
        public int? SupercededBy { get; set; }
        public DateTime InsertedDateTime { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public int IsDeleted { get; set; }
        public string AssignedMerlinCode { get; set; }
        public string AssignedIcd9code { get; set; }
        public DateTime? ProcessedDateTime { get; set; }
        public string ProcessedDisposition { get; set; }
        public int? Doiflag { get; set; }
        public int? LastProcessedObservationKey { get; set; }
        public int? HasImportantChanges { get; set; }
        public int? PickupStatus { get; set; }
        public int? MerlinResourceId { get; set; }
        public string ReferencePrefix { get; set; }
        public string ReferenceNumber1 { get; set; }
        public string ReferenceComparator { get; set; }
        public string ReferenceNumber2 { get; set; }
        public string Notifyflag { get; set; }
        public string RawAbnormalFlag { get; set; }
        public string CdGrouping { get; set; }
        public int? IdMerlinLrv { get; set; }
        public string NucSeq { get; set; }
        public string PerformingSiteName { get; set; }
        public string PerformingSiteCode { get; set; }
        public string PerformingSiteCodeType { get; set; }
        public string CdAmrIsolate { get; set; }
        public int? IdMerlinEvent { get; set; }
        public byte? InFluheaderResponsible { get; set; }
        public string RawUnits { get; set; }
        public string FilterAssignedMerlinResult { get; set; }
        public string SubId { get; set; }
        public int? IdMerlinFamily { get; set; }
        public bool? InMerlinParent { get; set; }
        public string PerformingSiteAddress1 { get; set; }
        public string PerformingSiteAddress2 { get; set; }
        public string PerformingSiteCity { get; set; }
        public string PerformingSiteState { get; set; }
        public string PerformingSiteZip { get; set; }
        public string PerformingSiteCountyCode { get; set; }
        public string PerformingSiteCountyName { get; set; }

        public ElrOrder OrderKeyNavigation { get; set; }
    }
}
