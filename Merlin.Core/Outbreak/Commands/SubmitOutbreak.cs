using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.Outbreak.Commands
{
    public class SubmitOutbreak : UpdateOutbreak
    {
        [Required(ErrorMessage = "Outbreak is required when submitting")]
        public override string IsOutbreak { get; set; } // IN_OUTBREAK
    }
}
