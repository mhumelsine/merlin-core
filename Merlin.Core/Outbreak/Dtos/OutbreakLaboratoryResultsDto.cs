using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Outbreak
{
    public class OutbreakLaboratoryResultsDto
    {
        public string IsHumanSpecimens { get;set;}
        public string NoOfCases { get; set; }
        public string IsFoodSpecimens { get; set; }
        public string LabFindings { get; set; }
        public string IsLabTestingConducted { get; set; }
    }
}
