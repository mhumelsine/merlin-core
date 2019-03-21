using System;
using System.Collections.Generic;

namespace Merlin.Core.Lab.Dtos
{
    public class LabResultDto
    {
        public string ProfileId { get; set; }
        public string NameIcd9 { get; set; }
        public string Icd9 { get; set; }
        public int LabId { get; set; }
        public string Accession { get; set; }
        public DateTime? EventDate { get; set; }
        public DateTime? ReportDate { get; set; }
        public string Specimen { get; set; }
        public string OverallResult { get; set; }
        public string LabTest { get; set; }
        public string ResultDetail { get; set; }
        public string StateLab{ get; set; } 
    }
}
