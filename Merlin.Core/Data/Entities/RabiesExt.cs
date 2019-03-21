using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class RabiesExt
    {
        public int IdCase { get; set; }
        public string InAnimalTested { get; set; }
        public DateTime? DtTested { get; set; }
        public string CdAnimalNotTested { get; set; }
        public string InPepRecommended { get; set; }
        public string InPepInitiated { get; set; }
        public string CdAnimalWas { get; set; }
        public string CdRelationshipAnimal { get; set; }
        public string DsRelationshipSpecify { get; set; }
        public string CdTypeExposure { get; set; }
        public string DsWhereBite { get; set; }
        public string DsBiteSpecify { get; set; }
        public string InEverVacc { get; set; }
        public string CdVaccBy { get; set; }
        public DateTime? DtLastVacc { get; set; }
        public string DsTypeVacc { get; set; }
        public string CdAttackProvoked { get; set; }
        public string CdReportedAnimalControl { get; set; }
        public string InPatientWashed { get; set; }
        public string DsAfterExposure { get; set; }
        public DateTime? DtSeePhysician { get; set; }
        public string InWashedFlushed { get; set; }
        public string InGaveTetanus { get; set; }
        public string InGaveAntibiotics { get; set; }
        public string InSuturedWound { get; set; }
        public string DsOtherTreatment { get; set; }
        public string CdConsultedPep { get; set; }
        public string DsRecommendedName { get; set; }
        public DateTime? DtPepInitiated { get; set; }
        public string InPreviouslyVacc { get; set; }
        public DateTime? DtDateVacc { get; set; }
        public string CdTypePep { get; set; }
        public string DsBegunCounty { get; set; }
        public string CdState { get; set; }
        public string DsOtherSpecify { get; set; }
        public string DsNotGivenSpecify { get; set; }
        public string CdSuppliedBy { get; set; }
        public string CdAdminBy { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdAnimalTested { get; set; }
        public string DsTestedOther { get; set; }
        public string DsNottestedOther { get; set; }
        public DateTime? DtExposure { get; set; }
        public string DsOthersiteSpecify { get; set; }
        public string InHeadNeck { get; set; }
        public string DsSuppliedByOther { get; set; }
    }
}
