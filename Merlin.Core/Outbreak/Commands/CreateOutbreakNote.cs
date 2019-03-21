using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.Outbreak.Commands
{
    public class CreateOutbreakNote
    {
        [Required]
        public int OutbreakId { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(1000)]
        public string Note { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string NoteType { get; set; }
    }
}
