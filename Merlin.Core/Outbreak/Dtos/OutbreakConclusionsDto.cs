using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Outbreak
{
    public class OutbreakConclusionsDto
    {
        public string Decisions { get; set;}
        public string Recommendations { get; set; }
        public string IsRecProvided { get; set; }
        public string MethodofRec { get; set; }
        public string RecImplemented { get; set; }
        public string ImprovementAreas { get; set; }
        public string IsReportCompleted { get; set; }
    }
}
