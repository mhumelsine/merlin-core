using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.ELRSearch.Dtos
{
    public class SearchCriteria
    {
        public string FQColumnName { get; set; }
        public string Operator { get; set; }
        public string Value { get; set; }
        public string Id { get; set; }

        [JsonIgnore]
        public string ParameterName
        {
            get
            {
                return $"@{FQColumnName.Replace('.', '_')}";
            }
        }

        [JsonIgnore]
        public string Expression
        {
            get
            {
                if (IsStartsWith)
                {
                    return UnsafeExpression;
                }

                return $"{FQColumnName} {Operator} {ParameterName}";
            }
        }

        protected string SanitizedValue
        {
            get
            {
                return Value
                    .Replace("'", "''")
                    .Replace("char(39)", string.Empty)
                    .Replace(@"/*", string.Empty)
                    .Replace(@"*\", string.Empty)
                    .Replace("--", string.Empty)
                    .Replace(";", string.Empty);
            }
        }

        /// <summary>
        /// Use 'Expression' if possible.  This may be unsafe.  Only use this when applying StartsWith type queries.  SQL Server cannot properly optimize queries to use an index
        /// in this case and query result in scans instead of seeks.  No solution yet offered.  Steps have been take to reduce possibility of SQL injection
        /// but parameters should be used if possible using 'Expression'
        /// </summary>
        public string UnsafeExpression
        {
            get
            {
                return $"(((((({FQColumnName} {Operator} '{SanitizedValue}'))))))";
            }
        }

        public bool IsStartsWith
        {
            get
            {
                return Operator == "LIKE"
                    && !Value.StartsWith("%")
                    && Value.EndsWith("%");
            }
        }
    }
}
