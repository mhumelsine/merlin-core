using Isf.Core.Cqrs.Web;
using Isf.Core.Data;
using Merlin.Core.Address.Dtos;
using Merlin.Core.Case;
using Merlin.Core.Case.Dtos;
using Merlin.Core.Codes.Dtos;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Lab.Dtos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Merlin.Web.Controllers
{
    [ResponseCache(CacheProfileName = "Default")]
    [Produces("application/json")]
    [Route("api/Case")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CaseController : Controller
    {
        private readonly MerlinReadStore readStore;
        private readonly MerlinReadContext readContext;

        public CaseController(MerlinReadStore readStore, MerlinReadContext readContext)
        {
            this.readStore = readStore;
            this.readContext = readContext;
        }

        [HttpGet("{caseId:int}/symptoms")]
        public async Task<IActionResult> GetSymptomsForCase([FromRoute]int caseId)
        {
            string sql =
            @"select
	            c.ID_CASE
	            ,s.CD_SYMPTOM SymptomCode
	            ,s.NM_SYMPTOM SymptomName
	            ,cs.DT_ONSET OnsetDate
	            ,cs.AM_ONSET_TIME OnsetTime
	            ,cs.DS_SYMPTOM_OTHER Other
	            ,case
		            when cs.CD_SYMPTOM is not null then 1
		            else 0
	            end as HasSymptom
            from (
				select *
				from (
					select 
						ROW_NUMBER() over(partition by cd_icd9 order by dt_effective) row_num
						, *
					from dbo.SYMPTOM_SET
				) active
				where row_num = 1
			)as ss
            inner join dbo.SYMPTOM_ICD9 i
            on ss.ID_SYMPTOM_SET = i.ID_SYMPTOM_SET
            inner join dbo.epi_case c
            on ss.cd_icd9 = c.CD_ICD9
            inner join dbo.SYMPTOM s
            on i.CD_SYMPTOM = s.cd_symptom
            left join dbo.CASE_SYMPTOM cs
            on c.ID_CASE = cs.ID_CASE
            and s.CD_SYMPTOM = cs.CD_SYMPTOM
            where c.id_case = @caseId";

            var symptomList = await readStore.QueryAsync<CaseSymptomDto>(sql, new { caseId });

            return Ok(symptomList);
        }

        [HttpGet("{caseId:int}/epilinks")]
        public async Task<IActionResult> GetEpiLinks([FromRoute]int caseId)
        {
            string sql = @"SELECT  
                            EP.ID_PROFILE as ProfileId, 
                            EP.NM_LAST as LastName, 
                            EP.NM_FIRST as FirstName, 
                            EC.ID_CASE as CaseId, 
                            EC.CD_ICD9 as Icd9, 
                            EC.DT_EVENT as EventDate, 
                            I.NM_ICD9 as DiseaseName,
                            LT.DS_DESC as RelationshipType,
                            EC.CD_DX_STATUS as DxStatus, 
                            EC.CD_ICD9 as Icd9,
                            EC.CD_ICD9 + ' - ' + I.NM_ICD9 AS FlDiseaseCode 
             FROM   RELATIONSHIP AS R INNER JOIN 
                    EPI_CASE AS EC ON R.ID_IDENTIFIER = EC.ID_CASE INNER JOIN 
                    EPI_PROFILE AS EP ON EC.ID_PROFILE = EP.ID_PROFILE INNER JOIN 
                    ICD9 AS I ON EC.CD_ICD9 = I.CD_ICD9 LEFT OUTER JOIN 
                    CODES AS LT ON R.CD_REL_TYPE = LT.CD_VALUE AND LT.CD_TYPE = 'LINK_TYPE'
                    WHERE R.ID_CASE = @caseId";

            var epiLinks = await readStore.QueryAsync<EpiLinkDto>(sql, new { caseId });

            return Ok(epiLinks);
        }


        //TODO:  This needs to be refactored
#region refactor
        [HttpGet("{caseId:int}/labsummary")]
        public async Task<IActionResult> GetLabSummary([FromRoute]int caseId)
        {
            var results = new List<LabSummaryResultDto>();

            string sql = @"SELECT DISTINCT C.CD_VALUE, CASE WHEN C.DT_EXPIRED <= GETDATE() AND C.DT_EXPIRED IS NOT NULL 
                              THEN DS_DESC + ' (Expired)' ELSE C.DS_DESC END AS Description, C.ID_SEQUENCE, I.CD_ICD9, I.NM_ICD9, 
                              IR.DS_RELATION AS Relation, I.NM_ICD9 + ' - ' + I.CD_ICD9 +   Case When IN_NON_REPORTABLE = 1 Then  ' (Not Reportable)' ELSE '' END +  
				              Case When (I.DT_EXPIRED Is NULL OR I.DT_EXPIRED = '1/1/1900')  
                                     Then  '' ELSE ' (EXPIRED)' END AS ICD9Name  
                 FROM         ICD9_RELATION AS IR INNER JOIN 
                                      ICD9 AS I ON I.CD_ICD9 = IR.CD_ICD9 LEFT OUTER JOIN 
                                      CODES AS C ON IR.DS_RELATION = C.CD_VALUE AND C.CD_TYPE = IR.CD_TYPE
				WHERE 
				I.CD_ICD9 =  (SELECT TOP 1 CD_ICD9 FROM EPI_CASE WHERE ID_CASE = @caseId) and 
				IR.CD_TYPE = 'FIELD_ACCESS'
				ORDER BY C.ID_SEQUENCE";

            var labSummary = await readStore.QueryAsync<LabSummaryDto>(sql, new { caseId });

            foreach (var item in labSummary)
            {
                results.Add(await GetLabResult(caseId, item));
            }

            return Ok(results);
        }
        private async Task<LabSummaryResultDto> GetLabResult(int caseId, LabSummaryDto labSummaryItem)
        {
            string fieldPrefix = string.Empty;
            string sql = string.Empty;

            var labResult = new LabSummaryResultDto();

            switch (labSummaryItem.Relation)
            {
                case "SEROSPECIE":
                    labSummaryItem.Relation = "SEROTYPE";
                    goto case "SEROTYPE";
                case "STRAIN":
                case "SEROGROUP":
                case "SEROTYPE":
                case "BIOTYPE":
                    //Dropdowns
                    labResult.Values = await GetLabSummaryDropdownValues(labSummaryItem.Relation);
                    fieldPrefix = "CD_";
                    break;
                default:
                    fieldPrefix = "DS_";
                    break;
            }
            sql = $"SELECT {fieldPrefix}{labSummaryItem.Relation} FROM EXT_LAB " +
                   "WHERE ID_CASE = @CaseId";

            labResult.Label = labSummaryItem.Description;
            labResult.Value = await readStore.QuerySingleAsync<string>(sql, new { caseId });

            return labResult;
        }
        private async Task<IEnumerable<DropdownCode>> GetLabSummaryDropdownValues(string RelationType)
        {
            string sql = $"SELECT distinct DS_RELATION As Code, DS_RELATION As Description FROM ICD9_RELATION " +
                          $"WHERE CD_TYPE = '{RelationType}'";

            return await readStore.QueryAsync<DropdownCode>(sql);
        }

# endregion


        [HttpGet("{caseId:int}/labs")]
        public async Task<IActionResult> GetLabsForCase([FromRoute]int caseId)
        {
            //TODO: check.!  it seems like the information is gotten from spGetProfileLabResult on entLabResultsValues.vb - Line 614 - DOH.Merlin project

            var sql = @" SELECT DISTINCT L.ID_PROFILE as ProfileId, ISNULL(L.ID_CASE, 0) AS ID_CASE, L.ID_LAB as LabId, L.ID_PANEL, L.CD_ICD9 as Icd9,
								 DATEDIFF(DAY, L.DT_ADDED, GETDATE()) AS TASK_LIST_DAYS, I.NM_ICD9 as NameIcd9, EP.NM_LAST, L.DS_ACCESSION as Accession,
                                 EP.NM_FIRST, L.CD_INVESTIGATOR, L.DT_REPORTED as ReportDate, L.CD_LAB_STATUS, L.DS_RESULT AS LAB_RESULT_DESC, TEST_TYPE.DS_DESC AS LabTest, 
								 L.CD_TEST_TYPE, L.DS_RESULT_OVERALL as OverallResult, L.DS_RESULT as ResultDetail, I.CD_DISPLAY_AS, 
                                 L.DT_COLLECTED, L.DT_RECEIVED, L.DT_LAB_EVENT as EventDate, L.DS_NOTES, '' AS ID_ANIMAL_PROFILE_ATTACHED, ISNULL(EC.CD_ICD9, '') 
                                 AS EPI_CASE_CD_ICD9, L.CD_SPECIMEN, SPEC_SITE.DS_DESC AS SPECIMEN, 
                                 ORDER_PROV.NM_RESOURCE + 
								 CASE WHEN (ORDER_PROV.NM_FIRST IS NULL OR 
                                 Rtrim(ORDER_PROV.NM_FIRST) = '') THEN '' ELSE (', ' + ORDER_PROV.NM_FIRST) END AS RESOURCE_NAME, L.DT_ELR_XMIT, L.AM_EXPOSURES_HIGH, L.AM_EXPOSURES_LOW, 
                                 LAB_CASE.CD_STATUS AS CD_CASE_STATUS, 
								 dbo.isEOF_Year(L.ID_CASE, GETDATE()) AS CASE_CLOSED_YEAR, R.IN_STATE_LAB as StateLab 
                    FROM         LAB AS L    LEFT OUTER JOIN  EPI_CASE AS EC    ON EC.ID_PROFILE = L.ID_PROFILE AND L.CD_ICD9 = EC.CD_ICD9 INNER JOIN  
                                 EPI_PROFILE AS EP    ON L.ID_PROFILE = EP.ID_PROFILE LEFT OUTER JOIN  
                                 ICD9 AS I    ON I.CD_ICD9 = L.CD_ICD9 LEFT OUTER JOIN  
                                 CODES AS SPEC_SITE    ON SPEC_SITE.CD_VALUE = L.CD_SPECIMEN AND SPEC_SITE.CD_TYPE = 'SPEC_SITE' LEFT OUTER JOIN  
                                 CODES AS TEST_TYPE    ON TEST_TYPE.CD_VALUE = L.CD_TEST_TYPE AND TEST_TYPE.CD_TYPE = 'LAB_TEST' LEFT OUTER JOIN  
                                 RESOURCE AS ORDER_PROV    ON L.ID_PROVIDER = ORDER_PROV.ID_RESOURCE AND ORDER_PROV.CD_RESOURCE_TYPE = 'PROVIDER' LEFT OUTER JOIN  
                                 EPI_CASE AS LAB_CASE ON LAB_CASE.ID_CASE = L.ID_CASE LEFT OUTER JOIN  
                                 RESOURCE R    ON L.ID_LABORATORY = R.ID_RESOURCE
                    WHERE        L.ID_CASE = @caseId ";

            var labs = await readStore.QueryAsync<LabResultDto>(sql, new { caseId });

            return Ok(labs);
        }

        [HttpGet("{caseId:int}/healthcarevisits")]
        public async Task<IActionResult> GetHealthCareVisitsForCase([FromRoute]int caseId)
        {
            string sql = @"SELECT 
                h.id_hospital_visit as Id
                ,h.id_case as CaseId
                ,h.dt_begin as VisitStartedOn
                ,h.dt_end as VisitEndedOn
                ,h.ds_room as RoomNumber
                ,c.DS_DESC as VisitType
                ,h.ds_medication as Medication
                ,h.ds_xray as XRay
                ,h.IN_EMERGENCY_VISIT EmergencyVisit
	            ,case 
		            when r.ID_RESOURCE is not null then r.NM_RESOURCE
		            else 'Hospital not on file'
	            end as HospitalName
            FROM dbo.EPI_CASE_HOSPITAL h
            left join dbo.resource r
            on h.id_hospital = r.ID_RESOURCE
            left join dbo.codes c
            on h.CD_VISIT_TYPE = c.cd_value
            and c.CD_TYPE = 'VISIT_TYPE'
            where id_case = @caseId";


            var visits = await readStore.QueryAsync<HealthCareVisitDto>(sql, new { caseId });

            return Ok(visits);
        }

        [HttpGet("{caseId:int}/travelhistory")]
        public async Task<IActionResult> GetTravelHistory([FromRoute]int caseId)
        {
            string sql = @"SELECT 
                            TH.ID_TRAVEL_HISTORY as TravelId,
                            CASE 
                                WHEN TH.CD_STATE = '' THEN TH.CD_COUNTRY 
                                ELSE TH.CD_STATE 
                            END as LocationExposed, 
                            TH.NM_FACILITY as LocationName, 
                            TH.DT_STAY_BEGIN as BeginDate, 
                            TH.DT_STAY_END as EndDate, 
                            TH.DS_COMMENTS as Notes
					FROM TRAVEL_HISTORY TH 
						LEFT OUTER JOIN CODES DS_COUNTY ON TH.CD_COUNTY = DS_COUNTY.CD_VALUE AND DS_COUNTY.CD_TYPE = 'COUNTY' 
						LEFT OUTER JOIN CODES TRAVEL_TYPE ON TH.CD_TRAVEL_TYPE = TRAVEL_TYPE.CD_VALUE AND TRAVEL_TYPE.CD_TYPE = 'TRAVEL_TYPE'  
						LEFT OUTER JOIN CODES TRAVEL ON TH.CD_TRAVELER = TRAVEL.CD_VALUE AND TRAVEL.CD_TYPE = 'TRAVEL' 
					WHERE 
						TH.CD_TRAVELER = 'PATIENT' AND
						TH.ID_CASE = @caseId";

            var addressSql = @"SELECT 
                            TH.ID_TRAVEL_HISTORY as TravelId,
                            TH.DS_ADDRESS1 as AddressLine1, 
                            TH.DS_ADDRESS2 as AddressLine2, 
                            TH.DS_CITY as City, 
                            TH.DS_ZIP as Zip, 
                            TH.CD_STATE as State,
                            DS_COUNTY.DS_DESC AS County, 
                            TH.CD_COUNTRY as Country
					FROM TRAVEL_HISTORY TH 
						LEFT OUTER JOIN CODES DS_COUNTY ON TH.CD_COUNTY = DS_COUNTY.CD_VALUE AND DS_COUNTY.CD_TYPE = 'COUNTY' 
						LEFT OUTER JOIN CODES TRAVEL_TYPE ON TH.CD_TRAVEL_TYPE = TRAVEL_TYPE.CD_VALUE AND TRAVEL_TYPE.CD_TYPE = 'TRAVEL_TYPE'  
						LEFT OUTER JOIN CODES TRAVEL ON TH.CD_TRAVELER = TRAVEL.CD_VALUE AND TRAVEL.CD_TYPE = 'TRAVEL' 
					WHERE TH.ID_TRAVEL_HISTORY = @TravelId";

            var travelHistoryItems = await readStore.QueryAsync<TravelHistoryDto>(sql, new { caseId });

            //TODO:  Is there no way to get this into a single query?

            foreach (var item in travelHistoryItems)
            {
                item.Address = await readStore.QuerySingleAsync<AddressDto>(addressSql, new { item.TravelId });
            }

            return Ok(travelHistoryItems);
        }

        [HttpGet("{caseId:int}/exposurelocation")]
        public async Task<IActionResult> GetExposureLocationCombos([FromRoute]int caseId)
        {
            var importedSql = @"SELECT 
					                CASE 
                                        WHEN CD_VALUE = '' THEN ''
						                WHEN CD_VALUE = 1 THEN 'FLORIDA'  
                                        WHEN CD_VALUE = 2 THEN 'OUT_OF_US' 
						                WHEN CD_VALUE = 3 THEN 'ANOTHER_STATE'
                                        WHEN CD_VALUE = 4 THEN 'US_TERRITORY'
						                WHEN CD_VALUE = 5 THEN 'ANYWHERE' 
						                ELSE 'UNKNOWN' 
					                END AS Code,
					                DS_DESC AS Description
					                FROM CODES
					                WHERE CD_TYPE = 'IMPORTED' Order By ID_SEQUENCE";


            var locationExposedSql = @"SELECT D.CD_VALUE + '~' + CAST(ISNULL(TH.ID_TRAVEL_HISTORY,0) AS VARCHAR) AS Code, D.DS_DESC as Description, D.CD_STATE, D.CD_COUNTRY, D.CD_REGION, D.GROUP_ORDER, CASE WHEN TH.ID_TRAVEL_HISTORY IS NULL THEN 0 ELSE 1 END AS IN_TRAVEL 
                            FROM 
                            ( 
                            SELECT '1~' + CD_VALUE  as CD_VALUE, DS_DESC, CD_VALUE AS CD_STATE, 'USA' AS CD_COUNTRY, '' AS CD_REGION, 0 AS GROUP_ORDER 
                            FROM CODES 
                            WHERE CD_TYPE = 'STATE' AND CD_VALUE NOT IN ('','AE','PR','VI') AND DT_EXPIRED IS NULL 
                            UNION 
                            SELECT '4~' + CD_VALUE AS CD_VALUE, DS_DESC, '' AS CD_STATE, '' AS CD_COUNTRY, CD_VALUE AS CD_REGION, 1 AS GROUP_ORDER 
                            FROM CODES 
                            WHERE CD_TYPE = 'REGION' AND CD_VALUE <> '' AND DT_EXPIRED IS NULL 
                            UNION 
                            SELECT '2~' + COUNTRY_STATE.CD_VALUE, COUNTRY.DS_DESC, COUNTRY_STATE.CD_VALUE AS CD_STATE, COUNTRY.DS_DESC AS CD_COUNTRY, '' AS CD_REGION, 2 AS GROUP_ORDER 
                            FROM CODES COUNTRY_STATE 
                            JOIN CODES COUNTRY 
                            ON COUNTRY.CD_VALUE = COUNTRY_STATE.DS_DESC AND COUNTRY.CD_TYPE = 'COUNTRY' AND COUNTRY.DT_EXPIRED IS NULL 
                            WHERE COUNTRY_STATE.CD_TYPE = 'COUNTRY_STATE' AND COUNTRY_STATE.CD_VALUE NOT IN ('','DEFAULT') AND COUNTRY_STATE.DT_EXPIRED IS NULL 
                            UNION 
                            SELECT '3~' + CD_VALUE, DS_DESC, '' AS CD_STATE, CD_VALUE AS CD_COUNTRY, '' AS CD_REGION, 2 AS GROUP_ORDER 
                            FROM CODES 
                            WHERE CD_TYPE = 'COUNTRY' AND CD_VALUE NOT IN ('') AND DT_EXPIRED IS NULL 
                             AND CD_VALUE NOT IN 
                            (SELECT DS_DESC FROM CODES WHERE CD_TYPE = 'COUNTRY_STATE' AND DT_EXPIRED IS NULL) 
                            ) D 
                            LEFT JOIN TRAVEL_HISTORY TH 
                            ON ISNULL(TH.CD_STATE,'') = D.CD_STATE AND ISNULL(TH.CD_COUNTRY,'') = D.CD_COUNTRY AND ISNULL(TH.CD_REGION,'') = D.CD_REGION AND TH.IN_MOST_LIKELY = 'YES' AND CD_TRAVELER = 'PATIENT' AND TH.ID_CASE = @caseId
                            ORDER BY GROUP_ORDER, DS_DESC";

            var results = new ExposureLocationDto();

            results.LocationsExposed = await readStore.QueryAsync<DropdownCode>(locationExposedSql, new { caseId });
            results.Imported = await readStore.QueryAsync<DropdownCode>(importedSql);

            return Ok(results);
        }

        [HttpGet("{caseId:int}/vaccinehistory")]
        public async Task<IActionResult> GetVaccineHistoryForCase([FromRoute]int caseId)
        {
            string sql =
                        @"SELECT V.DS_FLSHOTS_TYPE + ' - ' + V.DS_CPT_CODE AS vaccineType, 
                        VHE.DT_GIVEN AS dateGiven,
                        MFG.DS_DESC AS DS_MANUFACTURER,
                        VHE.DS_LOT AS lotNumber,
                        VHE.DS_DOSE AS DoseNumber, 
                        VHE.ID_PROFILE AS profileId,
                        VHE.ID_CASE AS caseID,
                        VHE.CD_ICD9 AS icd9,
                        VHE.ID_VACCINE AS vaccineID
                        FROM VACCINE_HISTORY_EXT VHE 
                        LEFT JOIN VACCINES V ON V.DS_CPT_CODE = VHE.CD_VACCINE_TYPE 
                        LEFT JOIN CODES MFG ON MFG.CD_VALUE = VHE.DS_VACCINE_MFG AND MFG.CD_TYPE = 'VACCINE_MFR' 
                        WHERE vhe.ID_CASE =@caseId
                        ORDER BY VHE.DT_GIVEN DESC";

            var VaccineHistory = await readStore.QueryAsync<VaccineHistoryDto>(sql, new { caseId });

            return Ok(VaccineHistory);
        }

        [HttpGet("{caseId:int}/details")]
        public async Task<IActionResult> GetDetailsForCase([FromRoute]int caseId)
        {
            var caseDetails = await readContext.EpiCase
                .Select(ec => new CaseDetailsDto
                {
                    CaseId = ec.IdCase,
                    ProfileId = ec.IdProfile ?? 0,
                    Name = $"{ec.Profile.NmFirst} {ec.Profile.NmLast}",
                    DateOfBirth = ec.Profile.DtBirth,
                    Icd9 = ec.CdIcd9,
                    CaseEventDate = ec.DtEvent,
                    CaseStatus = ec.CdStatus
                })
                .FirstOrDefaultAsync(l => l.CaseId == caseId);

            if(caseDetails == null)
            {
                return NotFound($"Case with CaseID '{caseId}' was not found");
            }

            return Ok(caseDetails);
        }

        //moved to codes controller
        //[HttpGet("vaccines")]
    }
}
