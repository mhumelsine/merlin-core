using Isf.Core.Web.Validation;
using Merlin.Core.Outbreak;
using Merlin.Core.Outbreak.Rules;
using Merlin.Core.Outbreak.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Merlin.Core.Data.DataContexts;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using Merlin.Core.Address.Dtos;
using Merlin.Core.Outbreak.Commands;
using Merlin.Core.Survey.Services;
using Microsoft.AspNetCore.Http;
using System.IO;
using Merlin.Core.EpiUser.Services;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Merlin.Core;

namespace Merlin.Web.Controllers
{
    [ResponseCache(CacheProfileName = "Never")]
    [Produces("application/json")]
    [Route("api/Outbreak")]
    public class OutbreakController : Controller
    {
        private readonly MerlinReadStore readStore;
        private readonly MerlinReadContext readContext;
        private readonly OutbreakRules rules;
        private readonly OutbreakService service;
        private readonly LayoutRepository layoutRepository;
        private readonly AuthenticationService authenticationService;
        private readonly IConfiguration config;
        private readonly EpicomRepository epicomRepository;
        private readonly OutbreakRepository outbreakRepository;


        public OutbreakController(MerlinReadStore readStore, MerlinReadContext readContext, OutbreakRules rules, OutbreakService service, LayoutRepository layoutRepository, AuthenticationService authenticationService, IConfiguration config, EpicomRepository epicomRepository, OutbreakRepository outbreakEventsRepository)
        {
            this.readStore = readStore;
            this.readContext = readContext;
            this.rules = rules;
            this.service = service;
            this.layoutRepository = layoutRepository;
            this.authenticationService = authenticationService;
            this.config = config;
            this.epicomRepository = epicomRepository;
            this.outbreakRepository = outbreakEventsRepository;
        }


        [HttpGet("{outbreakId:int}/Background")]
        public async Task<IActionResult> GetOutbreakBackgroundById([FromRoute]int outbreakId)
        {
            var background = await readContext.Outbreak
                .Where(bg => bg.IdOutbreak == outbreakId)
                .Select(bg => new
                {
                    OutbreakId = bg.IdOutbreak,
                    EventName = bg.NmOutbreak,
                    NotifiedDate = bg.DtChdNotified,
                    FirstNotified = bg.CdReporterType,
                    ReporterName = bg.NmReporter,
                    OutbreakStatus = bg.CdStatus,
                    InvestigationStarted = bg.DtInvestigated,
                    InvestigationClosed = bg.DtClosed,
                    Syndrome = bg.CdSyndromes,
                    OtherSyndrome = bg.DsSyndromeOther,
                    DiseaseHazard = bg.CdIcd9,
                    OtherDiseaseHazard = bg.DsDiseaseHazardOther,
                    EstimatedNumber = bg.AmEstimatedIll,
                    IsInvestigated = bg.InInvestigated,
                    IsOutbreak = bg.InOutbreak

                }).FirstOrDefaultAsync();

            return Ok(background);
        }

        [HttpGet("{OutbreakId:int}/GeographicLocation")]
        public async Task<IActionResult> GetOutbreakGeographicLocationById([FromRoute]int OutbreakId)
        {

            var outbreakGeographicLocation = await readContext.Outbreak
              .Where(rs => rs.IdOutbreak == OutbreakId)
              .Select(rs => new OutbreakGeographicLocationDTO
              {
                  Id = rs.IdOutbreak,
                  County = rs.CdCountyInitiating,
                  OtherCountiesAffected = rs.InMultiCounty,
                  OtherCountiesList = readContext.OutbreakEvents
                                      .Where(x => x.CdEventType.Equals("MULTI_COUNTY") && x.IdOutbreak.Equals(rs.IdOutbreak))
                                      .Select(item => item.CdSubType)
                                      .Distinct()
                                      .ToList(),
                  OtherStatesAffected = rs.InMultiState,
                  OtherStatesList = readContext.OutbreakEvents
                                      .Where(x => x.CdEventType.Equals("MULTI_STATE") && x.IdOutbreak.Equals(rs.IdOutbreak))
                                      .Select(item => item.CdSubType)
                                      .Distinct()
                                      .ToList(),
                  OtherCountriesList = readContext.OutbreakEvents
                                      .Where(x => x.CdEventType.Equals("MULTI_COUNTRY") && x.IdOutbreak.Equals(rs.IdOutbreak))
                                      .Select(item => item.CdSubType)
                                      .Distinct()
                                      .ToList()
              }).FirstOrDefaultAsync();


            return Ok(outbreakGeographicLocation);

        }

        [HttpGet("{OutbreakId:int}/SettingInformation")]
        public async Task<IActionResult> GetOutbreakSettingInformationById([FromRoute]int OutbreakId)
        {
            string sql = @"SELECT 
                        OS.ID_OUTBREAK as OutbreakId, 
                        OS.ID_SETTING as Id, 
                        OS.ID_RESOURCE_SETTING SettingFacilityId, 
                        OS.DS_RELATION_OUTBREAK, 
                        CASE 
	                        WHEN OS.ID_RESOURCE_SETTING IS NULL 
	                        THEN OS.CD_SETTING 
	                        ELSE RS.CD_SETTING 
                        END AS SettingType, 
                        SETTING.DS_DESC, 
                        OS.DS_SETTING_OTHER AS OtherType , 
                        ISNULL(OS.IN_PRIMARY,0) IsPrimary, 
                        CASE 
	                        WHEN OS.ID_RESOURCE_SETTING IS NULL 
	                        THEN OS.NM_FACILITY 
	                        ELSE RS.NM_SETTING 
                        END AS SettingName,
                        CASE 
	                        WHEN OS.ID_RESOURCE_SETTING IS NULL 
	                        THEN OS.IN_US_ADDRESS 
	                        ELSE OS.IN_US_ADDRESS 
                        END AS IN_US_ADDRESS, 
                        CASE 
	                        WHEN OS.ID_RESOURCE_SETTING IS NULL 
	                        THEN OS.NM_CONTACT 
	                        ELSE RS.NM_CONTACT 
                        END AS SettingContact, 
                        CASE 
	                        WHEN OS.ID_RESOURCE_SETTING IS NULL 
	                        THEN OS.DS_CONTACT_PHN 
	                        ELSE RS.DS_PHN 
                        END AS SettingContactPhone, 
                        OS.DT_CLOSED, 
                        OS.DS_COMMENTS 
                        FROM 
                        OUTBREAK_SETTINGS OS 
                        LEFT JOIN RESOURCE_SETTING RS 
                        ON RS.ID_RESOURCE_SETTING = OS.ID_RESOURCE_SETTING  
                        LEFT JOIN CODES SETTING 
                        ON SETTING.CD_TYPE = 'OB_SETTING' AND 
                        SETTING.CD_VALUE = 
                        CASE 
	                        WHEN OS.ID_RESOURCE_SETTING IS NULL 
	                        THEN OS.CD_SETTING 
	                        ELSE RS.CD_SETTING 
                        END 
                        WHERE OS.ID_OUTBREAK = @OutbreakId";

            string addressSql = @"SELECT 
                                OS.ID_SETTING, 
                                CASE 
	                                WHEN OS.ID_RESOURCE_SETTING IS NULL 
	                                THEN OS.DS_ADDRESS 
	                                ELSE RS.DS_ADDR1_NAME 
                                END AS AddressLine1, 
                                CASE 
	                                WHEN OS.ID_RESOURCE_SETTING IS NULL 
	                                THEN OS.DS_ADDRESS2 
	                                ELSE RS.DS_ADDR2 
                                END AS AddressLine2, 
                                CASE 
	                                WHEN OS.ID_RESOURCE_SETTING IS NULL 
	                                THEN OS.DS_CITY 
	                                ELSE RS.DS_CITY 
                                END AS City, 
                                CASE 
	                                WHEN OS.ID_RESOURCE_SETTING IS NULL 
	                                THEN OS.CD_STATE 
	                                ELSE RS.CD_STATE 
                                END AS State, 
                                STATE.DS_DESC, 
                                CASE 
	                                WHEN OS.ID_RESOURCE_SETTING IS NULL 
	                                THEN OS.DS_ZIP 
	                                ELSE RS.DS_ZIP 
                                END AS Zip, 
                                CASE 
	                                WHEN OS.ID_RESOURCE_SETTING IS NULL 
	                                THEN OS.CD_COUNTY 
	                                ELSE RS.CD_COUNTY 
                                END AS County, 
                                COUNTY.DS_DESC, 
                                CASE 
	                                WHEN OS.ID_RESOURCE_SETTING IS NULL 
	                                THEN OS.CD_COUNTRY 
	                                ELSE RS.CD_COUNTRY 
                                END AS Country, 
                                COUNTRY.DS_DESC 
                                FROM 
                                OUTBREAK_SETTINGS OS 
                                LEFT JOIN RESOURCE_SETTING RS 
                                ON RS.ID_RESOURCE_SETTING = OS.ID_RESOURCE_SETTING  
                                LEFT JOIN CODES COUNTY 
                                ON COUNTY.CD_TYPE ='COUNTY' AND 
                                COUNTY.CD_VALUE = CASE WHEN OS.ID_RESOURCE_SETTING IS NULL THEN OS.CD_COUNTY ELSE RS.CD_COUNTY END 
                                LEFT JOIN CODES STATE 
                                ON STATE.CD_TYPE ='STATE' AND 
                                STATE.CD_VALUE = CASE WHEN OS.ID_RESOURCE_SETTING IS NULL THEN OS.CD_STATE ELSE RS.CD_STATE END 
                                LEFT JOIN CODES COUNTRY ON COUNTRY.CD_TYPE ='COUNTRY' AND 
                                COUNTRY.CD_VALUE = CASE WHEN OS.ID_RESOURCE_SETTING IS NULL THEN OS.CD_COUNTRY ELSE RS.CD_COUNTRY END 
                                WHERE OS.ID_SETTING = @Id";

            var outbreakSettings = await readStore.QueryAsync<OutbreakSettingInformationDTO>(sql, new { OutbreakId });
            foreach (var item in outbreakSettings)
            {
                item.Address = await readStore.QuerySingleAsync<AddressDto>(addressSql, new { item.Id });
            }

            return Ok(outbreakSettings);
        }

        [HttpGet("setting/{settingFacilityId:int}")]
        public async Task<IActionResult> GetSettingInformationAddressById([FromRoute]int settingFacilityId)
        {
            var resource = await readContext.ResourceSetting
                .FindAsync(settingFacilityId);

            if (resource == null)
            {
                return NotFound($"The Resource Setting with id '{settingFacilityId}' was not found");
            }

            var dto = new
            {
                SettingContactPhone = resource.DsPhn,
                SettingContact = resource.NmContact,
                InUsAddress = resource.InUsAddress,
                AddressLine1 = resource.DsAddr1Name,
                AddressLine2 = resource.DsAddr2,
                Zip = resource.DsZip,
                City = resource.DsCity,
                County = resource.CdCounty,
                State = resource.CdState,
                Country = resource.CdCountry
            };

            return Ok(dto);
        }

        [HttpGet("{outbreakId:int}/transmission")]
        public async Task<IActionResult> GetTransmissionDtlsById([FromRoute]int outbreakId)
        {

            var TransmissionDtls = await readContext.Outbreak
                .Where(O => O.IdOutbreak == outbreakId)
                .Select(O => new OutbreakTransmissionDto
                {
                    TransmissionMode = O.CdModeTransmission,
                    FoodOrWaterRelated = O.InFoodWater,
                    IsVehicleIdentified = O.InVehicleFw,
                    Vehicle = O.DsVehicleFw,
                    HealthRelated = O.InHealthcare,
                    CauseForOutbreak = O.CdVehicleIdentified,
                    Description = O.DsVehicleHai
                }).FirstOrDefaultAsync();

            return Ok(TransmissionDtls);
        }

        [HttpGet("{outbreakId:int}/methods")]
        public async Task<IActionResult> GetOutbreakMethod([FromRoute]int outbreakId)
        {
            var caseDefinition = outbreakRepository.GetEventDescription(outbreakId, OutbreakEventType.CaseDefinition);
            var studyDesigns = outbreakRepository.GetEventSubTypes(outbreakId, OutbreakEventType.StudyDesign);
            var investigationMethods = outbreakRepository.GetEventSubTypes(outbreakId, OutbreakEventType.Investigation);
            var regulatoryAgencies = outbreakRepository.GetEventSubTypes(outbreakId, OutbreakEventType.Regulatory);

            var methods = await readContext.Outbreak
                .Where(outbreak => outbreak.IdOutbreak == outbreakId)
                .Select(outbreak => new OutbreakMethodsDto
                {
                    IsLabTestingConducted = outbreak.InLabConducted,
                    StaffConsulted = outbreak.DsStateConsulted,
                    Investigator = outbreak.NmInvestigator
                }).FirstOrDefaultAsync();

            if (methods != null)
            {
                methods.CaseDefinition = await caseDefinition;
                methods.StudyDesigns = await studyDesigns;
                methods.InvestigationMethods = await investigationMethods;
                methods.RegulatoryAgencies = await regulatoryAgencies;
            }
            return Ok(methods);
        }

        [HttpGet("{outbreakId:int}/results")]
        public async Task<IActionResult> GetOutbreakResultsById([FromRoute]int outbreakId)
        {
            var results = await readContext.Outbreak
                .Where(outbreak => outbreak.IdOutbreak == outbreakId)
                .Select(outbreak => new
                {
                    TotalCases = outbreak.AmTotalCases,
                    TotalCaseType = outbreak.CdTotalCaseType,
                    NonStaffCases = outbreak.AmNonStaffCases,
                    StaffCases = outbreak.AmStaffCases,
                    UnknownCases = outbreak.AmUnknownCases,
                    EmergencyVisits = outbreak.AmErDeptVisits,
                    EmergencyVisitsType = outbreak.CdErDeptVisitsType,
                    InpatientHospitalizations = outbreak.AmInpatientHospital,
                    InpatientHospitalizationsType = outbreak.CdInpatientHosptialType,
                    Deaths = outbreak.AmDeaths,
                    DeathsType = outbreak.CdDeathsType
                })
                .FirstOrDefaultAsync();

            return Ok(results);
        }

        [HttpGet("{outbreakId:int}/clinical-results")]
        public async Task<IActionResult> GetOutbreakClinicalResultsDtlsById([FromRoute]int outbreakId)
        {

            var symptoms = readContext.OutbreakSymptoms
                .Where(symptom => symptom.IdOutbreak == outbreakId)
                .Select(item => item.CdSymptoms)
                .ToListAsync();

            var otherSymptom = readContext.OutbreakSymptoms
                .Where(symptom => symptom.IdOutbreak == outbreakId)
                .Where(symptom => symptom.CdSymptoms == "OTHER")
                .Select(item => item.DsOther)
                .FirstOrDefaultAsync();

            //TODO:  Use DateTime type and formatter to create correct date format
            var clinicalResults = await readContext.Outbreak
                .Where(symptom => symptom.IdOutbreak == outbreakId)
                .Select(outbreak => new OutbreakClinicalResultsDTO
                {
                    FirstExposureDate = outbreak.DtEarliestExposure,
                    LastExposureDate = outbreak.DtLastExposure,
                    FirstOnsetDate = outbreak.DtEarliestOnset,
                    LastOnsetDate = outbreak.DtLastOnset,
                    OutbreakEventDate = outbreak.DtOutbreakEvent,
                    Duration = Convert.ToString(outbreak.AmMedianDuration),
                    TimeUnit = Convert.ToString(outbreak.CdMedianDurationUnit)
                })
                .FirstOrDefaultAsync();

            if (clinicalResults != null)
            {
                clinicalResults.Symptom = await symptoms;
                clinicalResults.OtherSymptom = await otherSymptom;
            }

            return Ok(clinicalResults);
        }

        [HttpGet("{outbreakId:int}/laboratory-results")]
        public async Task<IActionResult> GetOutbreakLabResultsDtlsById([FromRoute]int outbreakId)
        {
            var LabFindings = outbreakRepository.GetEventDescription(outbreakId, OutbreakEventType.LabFindings);

            var LabResultDtls = await readContext.Outbreak
                .Where(outbreak => outbreak.IdOutbreak == outbreakId)
                .Select(outbreak => new OutbreakLaboratoryResultsDto
                {
                    IsHumanSpecimens = outbreak.InLabConfirmed,
                    NoOfCases = Convert.ToString(outbreak.AmLabConfirmed),
                    IsFoodSpecimens = outbreak.InLabConfirmedFood,
                    IsLabTestingConducted = outbreak.InLabConducted
                })
                .FirstOrDefaultAsync();

            if (LabResultDtls != null)
            {
                LabResultDtls.LabFindings = await LabFindings;
            }

            return Ok(LabResultDtls);
        }

        [HttpGet("{outbreakId:int}/conclusions")]
        public async Task<IActionResult> GetOutbreakConclusionsDtlsById([FromRoute]int outbreakId)
        {
            var decisions = outbreakRepository.GetEventDescription(outbreakId, OutbreakEventType.Closure, OutbreakEventType.ConclusionNotes);
            var recommendations = outbreakRepository.GetEventDescription(outbreakId, OutbreakEventType.Closure, OutbreakEventType.Recommendations);
            var improvementAreas = outbreakRepository.GetEventDescription(outbreakId, OutbreakEventType.ProcessImprovements);

            var conclusions = await readContext.Outbreak
                .Where(outbreak => outbreak.IdOutbreak == outbreakId)
                .Select(outbreak => new OutbreakConclusionsDto
                {
                    IsReportCompleted = outbreak.InInternalAction,
                    IsRecProvided = outbreak.InRecommendations,
                    MethodofRec = outbreak.CdRecommendationsHow,
                    RecImplemented = outbreak.InImplemented
                })
                .FirstOrDefaultAsync();

            if (conclusions != null)
            {
                conclusions.Decisions = await decisions;
                conclusions.Recommendations = await recommendations;
                conclusions.ImprovementAreas = await improvementAreas;
            }

            return Ok(conclusions);
        }

        [HttpGet("{outbreakId:int}/documents")]
        public async Task<IActionResult> GetOutbreakDocumentsById([FromRoute]int outbreakId)
        {
            string sql = @"SELECT     
                            ED.ID_EPI_DOCUMENT As Id, 
                            OD.ID_OUTBREAK, 
                            OD.CD_EPI_DOCUMENT_TYPE, 
                            DOCTYPE.DS_DESC AS DocumentType, 
                            OD.DT_EPI_DOCUMENT AS DocumentDate, 
                            OD.DS_DESC as Description, 
                            '' As DOCUMENT_TYPE, 
                            OD.NM_FILE FileName,            
                            EU.NM_LAST_USER, 
                            EU.NM_FIRST_USER, 
                            OD.ID_ADDED, 
                            OD.DT_ADDED as DateAdded, 
                            ED.DS_MIME_CONTENT_TYPE, 
                            CASE 
	                            WHEN ISNULL(OP.NM_FIRST, '') = '' 
	                            THEN OP.NM_LAST 
	                            ELSE OP.NM_LAST + ', ' + OP.NM_FIRST 
                            END AS NM_FULL,
                            EU.NM_LAST_USER + ', '  + EU.NM_FIRST_USER as UserAdded, 
                            OD.ID_SEQUENCE  
                            FROM         
                            OUTBREAK_DOCUMENT AS OD 
                            INNER JOIN                       
                            EPI_DOCUMENT AS ED 
                            ON OD.ID_EPI_DOCUMENT = ED.ID_EPI_DOCUMENT 
                            INNER JOIN                       
                            EPI_USER AS EU 
                            ON OD.ID_ADDED = EU.ID_USER 
                            LEFT OUTER JOIN                       
                            OUTBREAK_PEOPLE AS OP 
                            ON OD.ID_SEQUENCE = OP.ID_SEQUENCE 
                            AND OD.ID_OUTBREAK = OP.ID_OUTBREAK                       
                            LEFT JOIN CODES DOCTYPE 
                            ON DOCTYPE.CD_TYPE = 'DOCS_EVENT' 
                            AND DOCTYPE.CD_VALUE = OD.CD_EPI_DOCUMENT_TYPE 
                            WHERE OD.ID_OUTBREAK = @outbreakId";

            var outbreakDocuments = await readStore.QueryAsync<OutbreakDocumentsDTO>(sql, new { outbreakId });

            return Ok(outbreakDocuments);
        }

        [HttpGet("{outbreakId:int}/notes")]
        public async Task<IActionResult> GetOutbreakNotesById([FromRoute]int outbreakId)
        {
            string sql =
           @"SELECT 
                         OE.ID_EVENT AS EventId, 
                         OE.CD_EVENT_Type AS NoteType, 
                         OE.DT_ADDED AS DateAdded, 
                         OE.DS_AUTHOR AS AuthorName, 
                         (
                            SELECT DS_DESC AS [text()] FROM 
                            OUTBREAK_EVENTS 
                            WHERE ID_EVENT = OE.ID_EVENT 
                            ORDER BY ID_SEQUENCE FOR XML PATH('')
                         ) AS Note
                         FROM 
                         (
                             SELECT DISTINCT OE.ID_EVENT, 
                             OE.ID_OUTBREAK, 
                             OE.CD_EVENT_TYPE, 
                             CASE 
                                WHEN OE.CD_EVENT_TYPE IN ('CLOSURE') 
                                THEN SUB_TYPE.DS_DESC 
                                ELSE EVENT_TYPE.DS_DESC 
                             END AS DS_EVENT_TYPE,
                             OE.CD_SUB_TYPE, 
                             OE.DT_EVENT, 
                             OE.ID_ADDED, 
                             OE.DT_ADDED, 
                             OE.ID_CHANGED,  
                             OE.DT_CHANGED, 
                             ISNULL(EU.NM_FIRST_USER + ' ' + EU.NM_LAST_USER, OE.ID_ADDED) AS DS_AUTHOR 
                             FROM 
                             OUTBREAK_EVENTS OE 
                             LEFT JOIN CODES 
                             EVENT_TYPE ON EVENT_TYPE.CD_TYPE = 'OB_EVENT' AND
                             EVENT_TYPE.CD_VALUE = OE.CD_EVENT_TYPE 
                             LEFT JOIN CODES 
                             SUB_TYPE ON SUB_TYPE.CD_TYPE = 'OB_EVENT' AND
                             SUB_TYPE.CD_VALUE = OE.CD_EVENT_TYPE AND
                             SUB_TYPE.DS_ASSOCIATION = OE.CD_SUB_TYPE 
                             LEFT JOIN EPI_USER
                             EU ON (EU.ID_USER = OE.ID_ADDED) 
                             WHERE OE.ID_OUTBREAK = @outbreakId AND
                             OE.CD_EVENT_TYPE IN ('OB_NOTE','REVIEW')
                         ) OE 
                         ORDER BY DateAdded, Note";

            var outbreakNotes = await readStore.QueryAsync<OutbreakNotesDTO>(sql, new { outbreakId });

            return Ok(outbreakNotes);
        }

        [HttpGet("{outbreakId:int}/audit")]
        public async Task<IActionResult> GetOutbreakAuditFieldsById([FromRoute]int outbreakId)
        {
            var audit = await readContext.Outbreak
                .Where(outbreak => outbreak.IdOutbreak == outbreakId)
                .Select(outbreak => new OutbreakAuditFieldsDTO
                {
                    CreatedOn = outbreak.DtAdded,
                    CreatedBy = outbreak.IdAdded,
                    ModifiedOn = outbreak.DtChanged,
                    ModifiedBy = outbreak.IdChanged
                }).FirstOrDefaultAsync();

            if (audit != null)
            {
                var created = readContext.EpiUser
                    .Where(user => user.IdUser == audit.CreatedBy)
                    .Select(user => user.NmFirstUser + " " + user.NmLastUser)
                    .FirstOrDefaultAsync();

                var modified = readContext.EpiUser
                    .Where(user => user.IdUser == audit.ModifiedBy)
                    .Select(user => user.NmFirstUser + " " + user.NmLastUser)
                    .FirstOrDefaultAsync();

                audit.CreatedBy = await created;
                audit.ModifiedBy = await modified;
            }

            return Ok(audit);
        }

        [HttpGet("{outbreakId:int}/caseReview")]
        [ResponseCache(CacheProfileName = "Never")] //need to be able to refresh after submit
        public async Task<IActionResult> GetOutbreakCaseReviewById([FromRoute]int outbreakId)
        {
            var caseReview = await readContext.Outbreak
                .Where(cr => cr.IdOutbreak == outbreakId)
                .Select(cr => new OutbreakCaseReviewDTO
                {
                    ReviewedOn = cr.DtReview,
                    ReviewedBy = cr.IdReviewer,
                    ReviewStatus = cr.CdReviewStatus
                })
                .FirstOrDefaultAsync();

            if (caseReview != null)
            {
                caseReview.ReviewedBy = await readContext.EpiUser
                    .Where(user => user.IdUser == caseReview.ReviewedBy)
                    .Select(user => user.NmFirstUser + " " + user.NmLastUser)
                    .FirstOrDefaultAsync();
            }

            return Ok(caseReview);
        }

        [HttpGet("{outbreakId:int}")]
        public async Task<IActionResult> GetOutbreakById([FromRoute]int outbreakId)
        {
            var outbreak = await readContext.Outbreak
                .FindAsync(outbreakId);

            if (outbreak == null)
            {
                return NotFound($"Outbreak with ID '{outbreakId}' was not found");
            }

            return Ok(outbreak);
        }

        [HttpGet("{outbreakId:int}/layout")]
        public async Task<IActionResult> GetOutbreakSurveyById([FromRoute]int outbreakId)
        {
            var layoutUid = await readContext.Survey
                .Where(survey => survey.IdOutbreak == outbreakId)
                .Where(survey => survey.CdSurveyType == "OUTBREAK_LEVEL")
                .Where(survey => survey.IdSurveyVersion == 1)
                .Select(survey => new
                {
                    layoutUid = survey.UidLayout,
                    SurveyUid = survey.UID
                })
                .FirstOrDefaultAsync();

            return Ok(layoutUid);
        }

        [HttpPut("submit")]
        public async Task<IActionResult> SubmitOutbreak([FromBody]SubmitOutbreak command)
        {
            await rules
                .RequireSettingInformation()
                .RequireDocumentsWhenAfterActionReportCompleted()
                .RequireModeOfTransmission()
                .RequireHumanSpecimenConfirmation()
                .Apply(command, ModelState);

            if (ModelState.IsValid)
            {
                await service.Execute(command);

                return Ok();
            }

            return BadRequest(ModelState);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateOutbreak([FromBody]UpdateOutbreak command)
        {
            await rules
                .RequireSettingInformation()
                .RequireDocumentsWhenAfterActionReportCompleted()
                .RequireModeOfTransmission()
                .RequireHumanSpecimenConfirmation()
                .Apply(command, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await service.Execute(command);

            return Ok();
        }

        [HttpPost("document")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadDocument([FromForm] UploadDocument command, [FromForm] IFormFile fileReference)
        {
            if (fileReference == null)
            {
                ModelState.AddModelError(nameof(fileReference), $"No file selected to upload.");

                return BadRequest(ModelState);
            }

            command.MIMEType = fileReference.ContentType;
            command.FileName = fileReference.FileName;

            using (var stream = new MemoryStream())
            {
                await fileReference.CopyToAsync(stream);
                command.FilesBytes = stream.ToArray();
            }

            await rules.Apply(command, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var document = await service.Execute(command);

            var uri = Url.Action("Get", new { id = document.IdEpiDocument });

            return Created(uri, new OutbreakDocumentsDTO
            {
                Id = document.IdEpiDocument,
                Description = document.DsDesc,
                FileName = document.NmFile,
                DocumentType = document.CdEpiDocumentType,
                DocumentDate = document.DtEpiDocument,
                UserAdded = document.IdAdded,
                DateAdded = document.DtAdded
            });
        }

        [HttpDelete("document/{documentId:int}")]
        public async Task<IActionResult> DeleteDocumentAsync([FromRoute]int documentId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var command = new DeleteDocument
            {
                Id = documentId
            };

            await service.Execute(command);

            return Ok();
        }

        [HttpGet("document/{documentId:int}")]
        public async Task<IActionResult> DownloadDocumentAsync([FromRoute]int documentId)
        {
            var fileName = readContext.OutbreakDocument
                .Where(doc => doc.IdEpiDocument == documentId)
                .Select(doc => doc.NmFile)
                .FirstAsync();

            var document = await readContext.EpiDocument
                .Where(doc => doc.IdEpiDocument == documentId)
                .Select(doc => new
                {
                    FileBytes = doc.BlEpiDocument,
                    MimeType = doc.DsMimeContentType
                })
                .FirstAsync();

            return File(document.FileBytes, document.MimeType, await fileName);
        }

        [HttpPost("note")]
        public async Task<IActionResult> CreateOutbreakNoteAsync([FromBody]CreateOutbreakNote command)
        {

            await rules
                .NoDuplicateNotes()
                .Apply(command, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var obEvent = await service.Execute(command);

            var uri = Url.Action("Get", new { id = obEvent.IdEvent });

            return Created(uri, new OutbreakNotesDTO
            {
                EventId = obEvent.IdEvent.Value,//this might should be ID_KEY
                Note = obEvent.DsDesc,
                DateAdded = obEvent.DtAdded,
                AuthorName = obEvent.IdAdded,
                NoteType = obEvent.CdEventType
            });
        }

        [HttpPut("note")]
        public async Task<IActionResult> SaveOutbreakNoteAsync([FromBody]UpdateOutbreakNote command)
        {
            await rules
                .NoDuplicateNotes()
                .Apply(command, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await service.Execute(command);

            return Ok();
        }

        [HttpDelete("note/{eventId:int}")]
        public async Task<IActionResult> DeleteOutbreakNoteAsync([FromRoute]DeleteOutbreakNote command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await service.Execute(command);

            return Ok();
        }

        [HttpPost("setting")]
        public async Task<IActionResult> SaveSettingAsync([FromBody]CreateSetting command)
        {
            await rules
                .RequireSettingNameOrFacilityId()
                .Apply(command, ModelState);

            if (ModelState.IsValid)
            {

                int settingId = await service.Execute(command);

                var uri = Url.Action("Get", new { id = settingId });

                return Created(uri, new OutbreakSettingInformationDTO
                {
                    Id = settingId,
                    Address = command.Address,
                    IsPrimary = command.IsPrimary,
                    OtherType = command.OtherType,
                    SettingContact = command.SettingContact,
                    SettingContactPhone = command.SettingContactPhone,
                    SettingName = command.SettingName,
                    SettingType = command.SettingType
                });
            }

            return BadRequest(ModelState);
        }

        [HttpPut("setting")]
        public async Task<IActionResult> SaveSettingAsync([FromBody]UpdateSetting command)
        {
            await rules
                .RequireSettingNameOrFacilityId()
                .Apply(command, ModelState);

            if (ModelState.IsValid)
            {

                await service.Execute(command);

                return Ok();
            }

            return BadRequest(ModelState);
        }


        [HttpDelete("setting/{id:int}")]
        public async Task<IActionResult> DeleteSettingAsync([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var command = new DeleteSetting
            {
                Id = id
            };

            await service.Execute(command);

            return Ok();
        }

        [HttpGet("epicom/{postId:int}")]
        public async Task<IActionResult> GetEpicomPostById([FromRoute]int postId)
        {
            var post = await epicomRepository.GetEpicomPostDetails(postId);

            return Ok(post);
        }

        [HttpGet("{outbreakId:int}/epicom")]
        public async Task<IActionResult> GetOutbreakEpicomById([FromRoute]int outbreakId)
        {
            //string sql = @"SELECT ISNULL((
            //    SELECT TOP 1( 
            //        SELECT DS_DESC AS [text()] 
            //        FROM dbo.OUTBREAK_EVENTS 
            //        WHERE ID_EVENT = OE.ID_EVENT 
            //        ORDER BY ID_SEQUENCE FOR XML PATH(''), TYPE
            //    ).value('.', 'nvarchar(max)')
            //FROM OUTBREAK_EVENTS OE 
            //WHERE OE.ID_OUTBREAK = @outbreakId AND OE.CD_EVENT_TYPE = 'EPICOM_POST_ID' 
            //ORDER BY OE.DT_EVENT DESC 
            //),'')";

            //var epicomUserId = await readContext.EpiUser
            //    .Where(user => user.IdUser.Equals(User.Identity.Name))
            //    .Select(user => user.DsEpicomId)
            //    .FirstOrDefaultAsync();

            //int epicomID;

            //bool idExists = int.TryParse(epicomUserId, out epicomID);

            //OutbreakEpicomDTO epicomDto = new OutbreakEpicomDTO
            //{
            //    PendingPostId = null,
            //    PostId = null,
            //    TopicId = null,
            //    ForumId = null,
            //    Title = null,
            //    Date = null,
            //    EpicomUserId = null
            //};

            //epicomDto.EpicomUserId = epicomUserId;

            var sPostId = await outbreakRepository.GetEventDescription(outbreakId, OutbreakEventType.EpiComPostId);
            var sPendingPostId = await outbreakRepository.GetEventDescription(outbreakId, OutbreakEventType.PendingEpiComPostId);

            //epicomDto.PendingPostId = pendingPostId;
            //epicomDto.PostId = postId;

            int postId = default(int);

            int.TryParse(sPostId, out postId);

            OutbreakEpicomDTO post;

            if (postId == default(int))
            {
                post = new OutbreakEpicomDTO { };
                if (postId > 0) post.PostId = postId;
            }
            else
            {
                post = await epicomRepository.GetEpicomPostDetails(postId);
            }

            int pendingPostId = default(int);
            if (int.TryParse(sPendingPostId, out pendingPostId)) post.PendingPostId = pendingPostId;

            return Ok(post);
        }

        [HttpGet("{outbreakId:int}/epicom-post-body")]
        public async Task<IActionResult> GetEpicomPost([FromRoute]int outbreakId)
        {
            OutbreakEpicomDTO epicomDto = new OutbreakEpicomDTO();

            var forumIdTask = outbreakRepository.GetEventDescription(outbreakId, OutbreakEventType.EpiComForum);
            var topicIdTask = outbreakRepository.GetEventDescription(outbreakId, OutbreakEventType.EpiComTopic);
            var title = outbreakRepository.GetEventDescription(outbreakId, OutbreakEventType.EpiComTitle);

            var body = await readStore.QuerySingleAsync<dynamic>("exec GenerateEpiComMessageBody @outbreakId", new { outbreakId });

            if (int.TryParse(await forumIdTask, out var forumId))
            {
                epicomDto.ForumId = forumId;
            }

            if (int.TryParse(await topicIdTask, out var topicId))
            {
                epicomDto.TopicId = topicId;
            }

            epicomDto.Title = await title;
            epicomDto.Message = body.HTML;

            return Ok(epicomDto);
        }

        [HttpGet("forum-names")]
        [ResponseCache(CacheProfileName = "Default")]
        public async Task<IActionResult> GetEpicomForumNames()
        {

            var results = await epicomRepository.GetForumNames();

            return Ok(results);
        }

        [HttpGet("forum-topics/{forumId:int}")]
        [ResponseCache(CacheProfileName = "Default", VaryByQueryKeys = new string[] { "forumId" })]
        public async Task<IActionResult> GetEpicomForumTopicsByForumId([FromRoute]int forumId)
        {

            var results = await epicomRepository.GetTopicsByForumId(forumId);

            return Ok(results);
        }

        [HttpPost("epicom")]
        [Authorize(Policy = "EpiComUser")]
        public async Task<IActionResult> SubmitEpicomPost([FromBody]SubmitEpicomPost command)
        {
            command.EpiComUserId = User.FindFirst(MerlinClaim.EpiComUserId).Value;
            command.IdSubmitted = User.Identity.Name;

            await rules
                .EpiComUserIdMustBeInt()
                .Apply(command, ModelState);

            var epicomPostUrl = await readContext.Codes
                .Where(code => code.CdType.Equals("FDENS") && code.CdValue.Equals("POST WEB SERVICE"))
                .Select(code => code.DsDesc)
                .FirstOrDefaultAsync();

            Uri epicomPostUri = new Uri(epicomPostUrl);

            com.epicomfl.PostsSoapClient c = new com.epicomfl.PostsSoapClient(com.epicomfl.PostsSoapClient.EndpointConfiguration.PostsSoap, epicomPostUrl, (epicomPostUri.Scheme.ToLower() == "https"));
            c.ClientCredentials.Windows.ClientCredential.Domain = config["EPICOM_DOMAIN"];
            c.ClientCredentials.Windows.ClientCredential.UserName = config["EPICOM_UID"];
            c.ClientCredentials.Windows.ClientCredential.Password = config["EPICOM_PWD"];

            command.PendingPostId = await c.CreatePendingMessageAsync(
                command.TopicId,
                command.Title,
                command.Message,
                int.Parse(command.EpiComUserId));

            await service.Execute(command);

            var uri = Url.Action("Get", new { id = command.PendingPostId });

            //TODO:  Why does this return an empty object?
            //var post = await epicomRepository.GetEpicomPostDetails(command.PendingPostId.Value);

            return Created(uri, command);
        }

        [HttpGet("{outbreakId:int}/labs")]
        [ResponseCache(CacheProfileName = "Default", VaryByQueryKeys = new string[] { "outbreakId" })]
        public async Task<IActionResult> GetOutbreakLabs([FromRoute]int outbreakId)
        {
            string sql = @"SELECT EC.ID_CASE AS [Case#],L.ID_LAB AS [Lab#],LRV.nm_observation as [Observation],LRV.DS_RESULT AS [Observation Result],CONVERT(VARCHAR,L.DT_REPORTED,101) AS [Date Reported],s.ds_desc as [Specimen Type],T.DS_DESC AS [Test Type] FROM EPI_CASE EC JOIN LAB L ON L.ID_LAB IN (SELECT ID_LAB FROM dbo.fnGetCaseLabs(EC.ID_CASE)) JOIN LAB_RESULT_VALUES LRV ON LRV.ID_LAB=L.ID_LAB AND LRV.CD_TEST_TYPE<>'IND_TEST' LEFT JOIN CODES R ON R.CD_TYPE='LAB_RESULT' AND R.CD_VALUE=L.DS_RESULT_OVERALL LEFT JOIN CODES S ON S.CD_TYPE='SPEC_SITE' AND S.CD_VALUE=L.CD_SPECIMEN LEFT JOIN CODES T ON T.CD_TYPE='LAB_TEST' AND T.CD_VALUE=L.CD_TEST_TYPE WHERE EC.ID_OUTBREAK = @outbreakId ORDER BY L.DT_REPORTED DESC";

            var results = await readStore.QueryAsync<dynamic>(sql, new { outbreakId });

            return Ok(results);
        }

        [HttpGet("{outbreakId:int}/status-history")]
        public async Task<IActionResult> GetStatusHistory([FromRoute]int outbreakId)
        {
          
            var historyList = await readContext.OutbreakStatusHistory
              .Where(history => history.IdOutbreak == outbreakId)
              .OrderBy(history => history.IdHistory)
              .Select(history => new
              {
                  status = history.CdStatus,
                  reviewStatus = history.CdReviewStatus,
                  reason = history.DsReason,
                  county = history.CdCounty,
                  date = history.DtAdded,
                  userId = history.IdAdded
              })            
              .ToListAsync();

            return Ok(historyList);
        }
    }
}
