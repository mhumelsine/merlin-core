using Dapper;
using System;
using System.Data;
using System.Data.Common;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Data.Services
{
    public static class DapperHelpers
    {
        public static DbConnection EnsureOpen(this DbConnection connection)
        {
            if(connection.State != ConnectionState.Open)
            {
                connection.Open();
            }

            return connection;
        }

        public static async Task ExecuteAsync(
            this IDbConnection connection, 
            string sql, 
            object param,
            int expectedRowsAffected,
            IDbTransaction transaction)
        {
            var affected = await connection.ExecuteAsync(sql, param, transaction);

            if(affected != expectedRowsAffected)
            {
                StringBuilder builder = new StringBuilder(
                    $"The statement '{sql}' affected an unexpected number of rows.  Expected '{expectedRowsAffected}' actually affected '{affected}'.  Params: ");

                foreach(var prop in param.GetType().GetProperties())
                {
                    builder.Append($"{prop.Name}='{prop.GetValue(param)}',");
                }

                throw new InvalidOperationException(builder.ToString());
            }
        }
    }
}
