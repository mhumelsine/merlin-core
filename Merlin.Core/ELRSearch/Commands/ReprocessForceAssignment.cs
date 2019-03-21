using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.ELRSearch.Commands
{
    public class ReprocessForceAssignment
    {
        [Required]
        public IEnumerable<int> ObservationKeys { get; set; }


        [Required]
        public string AssignmentType { get; set; }

        [Required]
        public string AssignmentReason { get; set; }
                
        public int? ProfileId { get; set; }
                
        public string StateNo { get; set; }

        public string County { get; set; }
    }
}
