using Merlin.Core.Data.DataContexts;
using Merlin.Core.Codes.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Merlin.Core.Codes.Services
{
    public class CodeRepository
    {
        private readonly MerlinReadStore db;

        public CodeRepository(MerlinReadStore db)
        {
            this.db = db;
        }

        public async Task<string> GetDescription(string value, params string[] types)
        {
            string sql = @"SELECT   top 1 DS_DESC  as Description
                           FROM     CODES 
                           WHERE    CD_TYPE  = @type
						   AND      CD_VALUE = @value;";
            foreach (string type in types)
            {
                var result = await db.QueryAsync<dynamic>(sql, new { type, value });
                if (result.FirstOrDefault() != null) return result.FirstOrDefault().Description;
            }

            return null;
        }

        public async Task<IEnumerable<DropdownCode>> GetCodes(string codeType)
        {
            if (string.IsNullOrWhiteSpace(codeType))
            {
                throw new ArgumentNullException(nameof(codeType));
            }

            var dropdownList = await GetDropdownAsync(codeType);

            //if (!dropdownList.Any())
            //{
            //    throw new EntityNotFoundException(typeof(Data.Codes), codeType);
            //}

            return dropdownList;
        }
        private async Task<IEnumerable<DropdownCode>> GetDropdownAsync(string codeType)
        {            
            var code = codeType.ToLower();

            switch (code)
            {
                case "icd9":
                    return await GetIcd9DropdownAsync();
                case "outbreak":
                    return await GetOutBreakDropdownAsync();
                case "countries":
                    return await GetCountriesAsync();
                case "counties":
                    return await GetCountiesAsync();
                case "county":
                    return await GetCountyAsync();
                case "symptoms":
                    return await GetSymptomsAsync();
                case "diseases":
                    return await GetDiseaseAsync();
                default:
                    return await GetCodesDropdownAsync(code, db);
            }
        }

        //private async Task<IEnumerable<DropdownCode>> GetTravelTypesAsync()
        //{
        //    string sql = @"SELECT CD_VALUE as Code,
        //                                DS_DESC as Description  
        //                       FROM CODES 
        //                       WHERE CD_TYPE = 'TRAVEL_TYPE' 
        //                        AND    (DT_EXPIRED >  CONVERT(DATE, GETDATE())  OR DT_EXPIRED IS NULL) 
        //                        Order By ID_SEQUENCE";

        //    return await db.QueryAsync<DropdownCode>(sql);
        //}

        private async Task<IEnumerable<DropdownCode>> GetCountriesAsync()
        {
            string sql = @"SELECT   CD_VALUE as Code,
	                                DS_DESC  as Description
                           FROM     CODES 
                           WHERE    CD_TYPE  IN ('COUNTRY','REGION') 
						   AND      (DT_EXPIRED > CURRENT_TIMESTAMP OR DT_EXPIRED IS NULL)
						   ORDER BY ID_SEQUENCE, Description";

            return await db.QueryAsync<DropdownCode>(sql);
        }

        //private async Task<IEnumerable<DropdownCode>> GetStatesAsync()
        //{
        //    string sql = @"SELECT 
	       //                         CD_VALUE as Code,
	       //                         DS_DESC as Description
        //                        FROM CODES 
        //                        WHERE  CD_TYPE = 'STATE' AND    
        //                        (DT_EXPIRED >  CONVERT(DATE, GETDATE())  OR DT_EXPIRED IS NULL)";

        //    return await db.QueryAsync<DropdownCode>(sql);
        //}

        private async Task<IEnumerable<DropdownCode>> GetCountiesAsync()
        {
            string sql = @" SELECT   CD_COUNTY as Code,
	                                 NM_NAME as Description
                            FROM     COUNTY
						    ORDER BY Description ASC";

            return await db.QueryAsync<DropdownCode>(sql);
        }

        private async Task<IEnumerable<DropdownCode>> GetIcd9DropdownAsync()
        {
            string sql = @" SELECT   CD_ICD9 Code, 
						              NM_ICD9 + ' - ' + CD_ICD9 AS Description 
						    FROM     dbo.ICD9
						    ORDER BY Description ASC";

            return await db.QueryAsync<DropdownCode>(sql);
        }
        private async Task<IEnumerable<DropdownCode>> GetOutBreakDropdownAsync()
        {
            string sql = @"SELECT     O.ID_OUTBREAK AS Code,
								      CAST(O.ID_OUTBREAK AS VARCHAR(25)) + ' - ' + I.NM_ICD9 + ' - ' + I.CD_ICD9 + ' / ' + O.NM_OUTBREAK AS Description
                            FROM      OUTBREAK O
                            LEFT JOIN dbo.ICD9 I
                            ON        O.CD_ICD9 = I.CD_ICD9
                            WHERE     IN_PRE_CODS = 0
							ORDER BY  Description ASC";

            return await db.QueryAsync<DropdownCode>(sql);
        }

        private async Task<IEnumerable<DropdownCode>> GetCodesDropdownAsync(string codeType, MerlinReadStore db)
        {
            string sql = 
                @"SELECT   CD_VALUE Code, DS_DESC Description 
                FROM     dbo.CODES 
                WHERE    CD_TYPE = @type
                AND      (DT_EXPIRED > CURRENT_TIMESTAMP OR DT_EXPIRED IS NULL)
                AND      DS_DESC NOT IN (' ','NOT AVAILABLE')
                ORDER BY ID_SEQUENCE, DS_DESC";

            return await db.QueryAsync<DropdownCode>(sql, new
            {
                type = codeType
            });
        }

        private async Task<IEnumerable<DropdownCode>> GetSymptomsAsync()
        {
            string sql = @"SELECT   CD_SYMPTOM Code,
                                    NM_SYMPTOM Description
                           FROM     dbo.SYMPTOM 
                           ORDER BY Description ASC ";
            return await db.QueryAsync<DropdownCode>(sql);
        }

        private async Task<IEnumerable<DropdownCode>> GetDiseaseAsync()
        {
            string sql = @"SELECT   CD_ICD9 Code,
                                NM_ICD9 + ' - ' + CD_ICD9 + CASE WHEN IN_NON_REPORTABLE = 1 THEN ' (Not Reportable)' ELSE '' END AS Description
                        FROM     ICD9 
                        WHERE    DT_EXPIRED IS NULL
                        OR		DT_EXPIRED > CURRENT_TIMESTAMP
                        ORDER BY Description ASC";

            return await db.QueryAsync<DropdownCode>(sql);
        }

        private async Task<IEnumerable<DropdownCode>> GetCountyAsync()
        {
            string sql = @"SELECT   CD_COUNTY Code,
                                    NM_NAME Description
                           FROM     dbo.COUNTY  
                           ORDER BY Description ASC ";
            return await db.QueryAsync<DropdownCode>(sql);
        }
    }
}
