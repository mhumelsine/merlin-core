using Merlin.Core.Utils;
using System;

namespace Merlin.Core.Case
{
    public class CaseSymptomDto : IHaveUniqueKey
    {
        public string SymptomCode { get; set; }
        public string SymptomName { get; set; }
        public int CaseId { get; set; }
        public DateTime? OnsetDate { get; set; }
        public string OnsetTime { get; set; }
        public string Other { get; set; }
        public bool HasSymptom { get; set; }
        public string UniqueKey => $"{CaseId}-{SymptomCode}";

        public override int GetHashCode()
        {
            return HashHelpers.GetHashCode(
                SymptomCode,
                OnsetDate,
                OnsetTime,
                CaseId,
                HasSymptom);            
        }

        public override bool Equals(object obj)
        {
            var other = obj as CaseSymptomDto;

            if(other == null)
            {
                return false;
            }

            return SymptomCode == other.SymptomCode
                && OnsetDate == other.OnsetDate
                && OnsetTime == other.OnsetTime
                && CaseId == other.CaseId
                && HasSymptom == other.HasSymptom;
        }

    }
}
