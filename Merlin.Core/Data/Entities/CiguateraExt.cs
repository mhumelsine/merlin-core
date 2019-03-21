using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CiguateraExt
    {
        public int IdCase { get; set; }
        public DateTime? DtFishEaten { get; set; }
        public string AmFishEatenTime { get; set; }
        public string InFishGrouper { get; set; }
        public string InFishSnapper { get; set; }
        public string InFishBarracuda { get; set; }
        public string InFishAmberjack { get; set; }
        public string InFishHogfish { get; set; }
        public string InFishUnknown { get; set; }
        public string InFishOther { get; set; }
        public string DsFishTypeOther { get; set; }
        public string DsPlaceObtainedOther { get; set; }
        public string DsGpsVendorLocation { get; set; }
        public DateTime? DtFishHarvested { get; set; }
        public decimal? AmFishWeight { get; set; }
        public string CdFishTaste { get; set; }
        public string InConsumeAlcohol { get; set; }
        public string DsFishPartConsumed { get; set; }
        public string InFishLeft { get; set; }
        public string InFishShared { get; set; }
        public string DsSymptomComplaint { get; set; }
        public string InReceivedTreatment { get; set; }
        public string InDiagnosedCiguatera { get; set; }
        public string InFishSendTesting { get; set; }
        public string DsPlaceFishTesting { get; set; }
        public string DsFishSentWhom { get; set; }
        public string InTestingResults { get; set; }
        public string CdTestingResult { get; set; }
        public string InHadCiguateraBefore { get; set; }
        public string DsAllergies { get; set; }
        public string InExposedInsecticides { get; set; }
        public string DsInsecticidesKind { get; set; }
        public string DsInsecticidesPlace { get; set; }
        public string DtInsecticides { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string InPlaceObtainedRestaurant { get; set; }
        public string InPlaceObtainedSelfHarvested { get; set; }
        public string InPlaceObtainedGrocerMarket { get; set; }
        public string InPlaceObtainedFriend { get; set; }
        public string InPlaceObtainedUnknown { get; set; }
        public string InPlaceObtainedOther { get; set; }
        public string InFishMahiMahi { get; set; }
        public string CdCiguateraBefore { get; set; }
        public string InAllergiesKnown { get; set; }
        public int? AmFishLength { get; set; }
        public int? AmFishConsumed { get; set; }
        public string NmCompany { get; set; }
        public string DsAddr1Company { get; set; }
        public string DsAddr2Company { get; set; }
        public string DsCityCompany { get; set; }
        public string CdStateCompany { get; set; }
        public string DsZipCompany { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
