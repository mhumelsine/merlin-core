using Merlin.Core.Data.DataContexts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Merlin.Core.Data.Services
{
    public class DataServices
    {
        private readonly MerlinReadStore readStore;
        private static Dictionary<string, IEnumerable<string>> keyColumnLookup;

        public DataServices(MerlinReadStore readStore)
        {
            this.readStore = readStore;
            keyColumnLookup = new Dictionary<string, IEnumerable<string>>();
        }

        public async Task<IEnumerable<string>> GetPksForTableAsync(string tableName)
        {
            //cache this with dictionary to improve speed
            if (keyColumnLookup.TryGetValue(tableName, out var keys))
            {
                return keys;
            }

            string sql =
                @"select u.COLUMN_NAME
                    from INFORMATION_SCHEMA.TABLE_CONSTRAINTS c
                    inner join INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE u
                    on c.CONSTRAINT_NAME = u.CONSTRAINT_NAME
                    where c.constraint_type = 'PRIMARY KEY'
                    and c.TABLE_NAME = @tableName";

            var keyColumns = await readStore.QueryAsync<string>(sql, new { tableName });

            keyColumnLookup[tableName] = keyColumns;

            return keyColumns;
        }
    }
}
