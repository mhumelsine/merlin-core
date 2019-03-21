using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SentinelSpecimen
    {
        public int IdSpecimen { get; set; }
        public int IdSentinel { get; set; }
        public string NmFirst { get; set; }
        public string NmLast { get; set; }
        public string CdAddress { get; set; }
        public string DsCity { get; set; }
        public string CdCounty { get; set; }
        public string CdState { get; set; }
        public string DsZipcode { get; set; }
        public string CdGender { get; set; }
        public string CdRace { get; set; }
        public string CdEthnicity { get; set; }
        public string CdAge { get; set; }
        public DateTime DtBirth { get; set; }
        public DateTime? DtVisit { get; set; }
        public DateTime? DtOnset { get; set; }
        public bool? InFever { get; set; }
        public bool? InCough { get; set; }
        public bool? InSoreThroat { get; set; }
        public bool? InRhinorrhea { get; set; }
        public bool? InMyalgia { get; set; }
        public string DsOtherSymptom { get; set; }
        public int? InReceiveTreatment { get; set; }
        public int? InReceiveAntiviral { get; set; }
        public int? InSeasonalVaccine { get; set; }
        public int? InNovelH1n1 { get; set; }
        public string DsRapidTest { get; set; }
        public string IdImported { get; set; }
        public DateTime DtImported { get; set; }
        public bool? InSentCdc { get; set; }
        public DateTime? DtReported { get; set; }
        public string DsDiagnosis { get; set; }
        public string DsSpecimenType { get; set; }
        public string DsTestsOther { get; set; }
        public bool? InNasalcong { get; set; }
        public bool? InEarache { get; set; }
        public bool? InAnorexia { get; set; }
        public bool? InChills { get; set; }
        public bool? InMalaise { get; set; }
        public bool? InVomiting { get; set; }
        public bool? InDiarrhea { get; set; }
        public bool? InAbpain { get; set; }
        public bool? InHeadache { get; set; }
        public bool? InWheezing { get; set; }
        public bool? InConjunctivitis { get; set; }
        public string DsMeasuredTemperature { get; set; }
        public int? InAntipyreticsUsage { get; set; }
        public int? InHospitalization { get; set; }
        public string DsSeverityIllness { get; set; }
        public string CdAgeType { get; set; }
    }
}
