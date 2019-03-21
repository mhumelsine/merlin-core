using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.SmartGoals.Dtos
{
   public class SmartGoalsResultsDto
    {
        public decimal Days { get; set; } 
        public string IdResolved { get; set; }
        public decimal Resolved { get; set; }
        public string DisposPerDay { get; set; }
        public decimal Rejected { get; set; }
        public decimal PercentRejected{ get; set; }
        public int OpenAssignments { get; set; }
        public string HalRegion { get; set; }
        public int OutStandingDays { get; set; }
        public int AvgDaysToResolve { get; set; }


    }
}
