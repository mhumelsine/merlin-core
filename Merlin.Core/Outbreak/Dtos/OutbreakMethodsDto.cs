using System.Collections.Generic;

namespace Merlin.Core.Outbreak
{
    public class OutbreakMethodsDto
    {
        public string CaseDefinition { get; set;}
        public IEnumerable<string> StudyDesigns { get; set; }
        public IEnumerable<string> InvestigationMethods { get; set; }
        public string IsLabTestingConducted { get; set; }
        public string StaffConsulted { get; set; }
        public IEnumerable<string> RegulatoryAgencies { get; set; }
        public string Investigator { get; set; }
    }
}
