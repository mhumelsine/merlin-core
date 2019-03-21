using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.ELRSearch.Commands
{
    public class ReprocessForceImport
    {
        [Required]
        public IEnumerable<int> ObservationKeys { get; set; }

        [RequiredWhen("StateNo", null, ErrorMessage = "ProfileId is required when StateNo is blank.")]
        public int? ProfileId { get; set; }

        [RequiredWhen("ProfileId", null, ErrorMessage = "StateNo is required when ProfileId is blank.")]
        public string StateNo { get; set; }
    }
}
