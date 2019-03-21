using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Merlin.Core.Outbreak.Commands
{
    [ValidDateRange("InvestigationStarted", "InvestigationClosed", ErrorMessage = "The Investigation Closed Date must be on or after the Investigation Start Date")]
    [ValidDateRange("FirstOnsetDate", "NotifiedDate", ErrorMessage = "The FDOH Notified Date must be on or after the Earliest Onset Date")]
    [ValidDateRange("FirstOnsetDate", "LastOnsetDate", ErrorMessage = "First Onset must be before Last Onset")]
    [ValidDateRange("FirstExposureDate", "LastExposureDate", ErrorMessage = "First Exposure must be before Last Exposure")]

    public class UpdateOutbreak {

        public bool WasSubmitted {
            get {
                return ReviewStatus == OutbreakReviewStatus.Pending
                    || ReviewStatus == OutbreakReviewStatus.Accepted;
            }
        }

        public Guid? SurveyUid { get; set; }
        public IDictionary<string, object> SurveyAnswers { get; set; }

        public bool NeedsSubmitCheck { get { return this is SubmitOutbreak || WasSubmitted; } }
        public bool ConfirmedOutbreak { get { return IsOutbreak == "YES"; } }

        [Required]
        public int OutbreakId { get; set; }


        /* BACKGROUND */
        [Required]
        public string EventName { get; set; }  // NM_OUTBREAK

        [Required]
        [DataType(DataType.Date)]
        [NoFutureDate]        
        public DateTime? NotifiedDate { get; set; } // DT_CHD_NOTIFIED
        public string FirstNotified { get; set; } // CD_REPORTER_TYPE
        public string ReporterName { get; set; } // NM_REPORTER
        public string OutbreakStatus { get; set; } // CD_STATUS

        [DataType(DataType.Date)]
        [NoFutureDate]
        public DateTime? InvestigationStarted { get; set; } // DT_INVESTIGATED

        [DataType(DataType.Date)]
        [NoFutureDate]
        [RequiredWhen(nameof(IsOutbreak), "NO")]
        [RequiredWhen(nameof(OutbreakStatus), "CLOSED")]
        public DateTime? InvestigationClosed { get; set; } // DT_CLOSED

        [Required]
        public string Syndrome { get; set; } // CD_SYNDROMES
        public string OtherSyndrome { get; set; } // DS_SYNDROME_OTHER
        public string DiseaseHazard { get; set; } // CD_ICD9
        public string OtherDiseaseHazard { get; set; } // DS_DISEASE_HAZARD_OTHER

        [Required]
        public int? EstimatedNumber { get; set; } // AM_ESTIMATED_ILL

        [Required]
        public string IsInvestigated { get; set; } //  IN_INVESTIGATED
        public virtual string IsOutbreak { get; set; } // IN_OUTBREAK




        /* Clinical Results */
        [Required]
        public List<String> Symptom { get; set; }
        public string OtherSymptom { get; set; }

        [DataType(DataType.Date)]
        [NoFutureDate]        
        public DateTime? FirstExposureDate { get; set; }

        [DataType(DataType.Date)]
        [NoFutureDate]
        public DateTime? LastExposureDate { get; set; }

        [DataType(DataType.Date)]
        [NoFutureDate]
        public DateTime? FirstOnsetDate { get; set; }

        [DataType(DataType.Date)]
        [NoFutureDate]
        public DateTime? LastOnsetDate { get; set; }

        public int? Duration { get; set; }
        public string TimeUnit { get; set; }
        public string OutbreakEventDate { get; set; }



        /* Geographic Location */
        [Required]
        public string County { get; set; }
        public string OtherCountiesAffected { get; set; }
        public List<string> OtherCountiesList { get; set; }
        public string OtherStatesAffected { get; set; }
        public List<string> OtherStatesList { get; set; }
        public List<string> OtherCountriesList { get; set; }


        /* Transmission Mode */
        public string TransmissionMode { get; set; }
        public string FoodOrWaterRelated { get; set; }
        public string IsVehicleIdentified { get; set; }
        public string Vehicle { get; set; }
        public string HealthRelated { get; set; }
        public string CauseForOutbreak { get; set; }
        public string Description { get; set; }


        /* Methods */
        public string CaseDefinition { get; set; }
        public List<string> StudyDesigns { get; set; }
        public List<string> InvestigationMethods { get; set; }
        public string IsLabTestingConducted { get; set; }
        public string StaffConsulted { get; set; }
        public List<string> RegulatoryAgencies { get; set; }
        public string Investigator { get; set; }

        /* Results */
        public int? TotalCases { get; set; }
        public string TotalCaseType { get; set; }
        public int? NonStaffCases { get; set; }
        public int? StaffCases { get; set; }
        public int? UnknownCases { get; set; }
        public string EmergencyVisitsType { get; set; }
        public int?  EmergencyVisits { get; set; }
        public int? InpatientHospitalizations { get; set; }
        public string InpatientHospitalizationsType { get; set; }
        public int? Deaths { get; set; }
        public string DeathsType { get; set; }

        /* Conclusions */
        public string Decisions { get; set; }
        public string IsRecProvided { get; set; }
        public string MethodofRec { get; set; }
        public string Recommendations { get; set; }
        public string WereRecommendationsImplemented { get; set; }
        public string ImprovementAreas { get; set; }
        public string IsReportCompleted { get; set; }


        /* Case Review */
        public string ReviewedBy { get; set; }
        public DateTime? ReviewedOn { get; set; }
        public string ReviewStatus { get; set; }
        public string Comments { get; set; }
        public bool IsSubmitted { get; set; }

        /* Laboratory Results */

        public string IsHumanSpecimens { get; set; }
        public int? NoOfCases { get; set; }
        public string IsFoodSpecimens { get; set; }
        public string LabFindings { get; set; }

        /* EpiCom */
        public int? PostId { get; set; }
        public int? PendingPostId { get; set; }
        public int? ForumId { get; set; }
        public string ForumDescription { get; set; }
        public int? TopicId { get; set; }
        public string TopicDescription { get; set; }
        public DateTime? Date { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int? EpicomUserId { get; set; }
        public string Message { get; set; }
    }
}
