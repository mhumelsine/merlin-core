using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Case
{
   public class CaseDetailsDto
    {
        public int CaseId { get; set; }
        public int ProfileId { get; set; }
        public string Name { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Icd9 { get; set; }
        public DateTime? CaseEventDate { get; set; }
        public string CaseStatus { get; set; }
    }
}
