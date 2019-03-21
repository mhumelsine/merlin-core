using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Case.Dtos
{
    public class HealthCareVisitDto
    {
        public int Id { get; set; }
        public int CaseId { get; set; }
        public DateTime? VisitStartedOn { get; set; }
        public DateTime? VisitedEndedOn { get; set; }
        public string RoomNumber { get; set; }
        public string VisitType { get; set; }
        public string Medication { get; set; }
        public string XRay { get; set; }
        public string EmergencyVisit { get; set; }
        public string HospitalName { get; set; }
    }
}
