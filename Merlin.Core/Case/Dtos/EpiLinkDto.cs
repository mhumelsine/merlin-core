using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Case.Dtos
{
    public class EpiLinkDto
    {
        public int ProfileId { get; set; }
        public int CaseId { get; set; }
        public string RelationshipType { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DxStatus { get; set; }
        public string Icd9 { get; set; }
        public string FlDiseaseCode { get; set; }
        public DateTime? EventDate { get; set; }
    }
}
