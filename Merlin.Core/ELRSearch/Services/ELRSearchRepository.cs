using System.Collections.Generic;
using System.Threading.Tasks;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.ELRSearch.Dtos;

namespace Merlin.Core.ELRSearch.Services
{
    public class ELRSearchRepository
    {
        private readonly ElrReadStore readStore;

        public ELRSearchRepository(ElrReadStore readStore)
        {
            this.readStore = readStore;
        }

        public async Task<IEnumerable<ColumnInfoDto>> GetElrColumns()
        {
            string sql = @"select FQColumnName, ColumnName, DataType
            from (
	            select 
		            fq_column_name FQColumnName
		            , COLUMN_NAME ColumnName
		            ,DATA_TYPE DataType
		            ,ROW_NUMBER() over (partition by column_name order by r) row_num
	            from (
		            select 
			            table_name + '.' + column_name as fq_column_name
			            ,column_name
			            ,case 
				            when table_name = 'elrObservation' then 1
				            when table_name = 'elrOrder' then 2
				            when table_name = 'elrRequest' then 3
				            else 4
			            end r
			            ,case
			                when data_type in ('varchar', 'char', 'nvarchar', 'text', 'uniqueidentifier') then 'string'
			                when data_type in ('date', 'datetime', 'datetime2') then 'date'
			                when data_type in ('int', 'bigint', 'float', 'smallint', 'tinyint', 'bit') then 'number'
			                else data_type
		                end DATA_TYPE
		            from INFORMATION_SCHEMA.COLUMNS
		            where table_name in ('elrRequest', 'elrOrder', 'elrObservation')
	            ) r
            ) t
            where row_num = 1";

            var columnInfo = await readStore.QueryAsync<ColumnInfoDto>(sql);

            return columnInfo;
        }      
    }
}

