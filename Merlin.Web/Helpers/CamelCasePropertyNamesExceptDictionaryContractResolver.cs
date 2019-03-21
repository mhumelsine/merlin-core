using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Merlin.Web.Helpers
{
    public class CamelCasePropertyNamesExceptDictionaryContractResolver : CamelCasePropertyNamesContractResolver
    {
        protected override string ResolveDictionaryKey(string dictionaryKey)
        {
            //we only need to preseve casing on survey question IDs

            if(Regex.IsMatch(dictionaryKey, @"^([D,T,P]\d*|RG-.*)$"))
            {
                return dictionaryKey;
            }

            return base.ResolveDictionaryKey(dictionaryKey);
        }
    }
}
