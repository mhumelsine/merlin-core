using Merlin.Core.Data.DataContexts;
using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Merlin.Core.Data.Services
{
    public class DbSequenceGenerator : ISequenceGenerator
    {
        private MerlinReadStore db;

        public DbSequenceGenerator(MerlinReadStore db)
        {
            this.db = db;
        }
        public async Task<long> GetNextAsync(string key)
        {
            //we cannot use parameters here so we need to be very sure no SQL injection is possible
            if(Regex.IsMatch(key, @"^\w+$"))
            {
                return await db.QuerySingleAsync<int>($"select next value for dbo.{key};");
            }

            throw new InvalidOperationException(
                $"Potentionally dangerous sequence name '{key}' in DbSequenceGenerator.");
        }
    }
}
