using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ElrRequest
    {
        public ElrRequest()
        {
            ElrOrder = new HashSet<ElrOrder>();
        }

        public int RequestKey { get; set; }
        public string RequestId { get; set; }
        public string PlacerRequestId { get; set; }
        public string SendingApplication { get; set; }
        public string SendingApplicationCode { get; set; }
        public string SendingApplicationCodeType { get; set; }
        public string SendingFacilityName { get; set; }
        public string SendingFacilityCode { get; set; }
        public string SendingFacilityCodeType { get; set; }
        public string PatientId { get; set; }
        public string PatientFirstName { get; set; }
        public string PatientLastName { get; set; }
        public string PatientMiddleName { get; set; }
        public string PatientSuffix { get; set; }
        public DateTime? PatientDob { get; set; }
        public string PatientGender { get; set; }
        public string PatientRace { get; set; }
        public string PatientSsn { get; set; }
        public string PatientAddress1 { get; set; }
        public string PatientAddress2 { get; set; }
        public string PatientCity { get; set; }
        public string PatientState { get; set; }
        public string PatientZip { get; set; }
        public string PatientCountyCode { get; set; }
        public string PatientCountyName { get; set; }
        public string PatientPhoneData { get; set; }
        public string OrderingFacilityId { get; set; }
        public string OrderingFacilityName { get; set; }
        public string OrderingFacilityAddress1 { get; set; }
        public string OrderingFacilityAddress2 { get; set; }
        public string OrderingFacilityCity { get; set; }
        public string OrderingFacilityState { get; set; }
        public string OrderingFacilityZip { get; set; }
        public string OrderingFacilityCountyCode { get; set; }
        public string OrderingFacilityCountyName { get; set; }
        public string OrderingFacilityPhoneData { get; set; }
        public string OrderingProviderId { get; set; }
        public string OrderingProviderFirstInitial { get; set; }
        public string OrderingProviderLastName { get; set; }
        public string OrderingProviderName { get; set; }
        public string OrderingProviderAddress1 { get; set; }
        public string OrderingProviderAddress2 { get; set; }
        public string OrderingProviderCity { get; set; }
        public string OrderingProviderState { get; set; }
        public string OrderingProviderZip { get; set; }
        public string OrderingProviderCountyCode { get; set; }
        public string OrderingProviderCountyName { get; set; }
        public DateTime? MessageDateTime { get; set; }
        public Guid? AuditGuid { get; set; }
        public int? Supercedes { get; set; }
        public int? SupercededBy { get; set; }
        public DateTime InsertedDateTime { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public int IsDeleted { get; set; }
        public int? MerlinResourceId { get; set; }
        public string Hl7race { get; set; }
        public string Phinrace { get; set; }
        public string PatientEthnicity { get; set; }
        public string Hl7ethnicity { get; set; }
        public string Phinethnicity { get; set; }
        public string Hl7gender { get; set; }
        public string Phingender { get; set; }
        public string PatientPhoneNumber { get; set; }
        public string PatientPhoneCountryCode { get; set; }
        public string PatientPhoneAreaCode { get; set; }
        public string PatientPhoneExtension { get; set; }
        public string OrderingFacilityPhoneNumber { get; set; }
        public string OrderingFacilityPhoneCountryCode { get; set; }
        public string OrderingFacilityPhoneAreaCode { get; set; }
        public string OrderingFacilityPhoneExtension { get; set; }
        public string Age { get; set; }
        public string OrderingProviderPhoneData { get; set; }
        public string OrderingProviderPhoneNumber { get; set; }
        public string OrderingProviderPhoneCountryCode { get; set; }
        public string OrderingProviderPhoneAreaCode { get; set; }
        public string OrderingProviderPhoneExtension { get; set; }
        public string OrderingProviderSentinelId { get; set; }
        public string Pregnant { get; set; }
        public string MessageKey { get; set; }
        public string OrderingFacilitySentinelId { get; set; }
        public int? KinKey { get; set; }
        public int? PatVisitKey { get; set; }
        public string FastingIndicator { get; set; }
        public DateTime? OnSetDateofIllness { get; set; }
        public double? AmLatitude { get; set; }
        public double? AmLongitude { get; set; }
        public bool? InAddressValidated { get; set; }
        public string Addr1 { get; set; }
        public string Addr2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string CdCounty { get; set; }
        public string DsCounty { get; set; }
        public string DsAccumailMsg { get; set; }
        public string Symptoms { get; set; }
        public string TravelHistory { get; set; }
        public string ProgComponent { get; set; }
        public string ProgSubComp { get; set; }
        public string SpecialHandle { get; set; }
        public string LabPriority { get; set; }
        public string Outbreak { get; set; }
        public string SpecialProject { get; set; }

        public ICollection<ElrOrder> ElrOrder { get; set; }
    }
}
