using System.ComponentModel.DataAnnotations;

namespace Merlin.Core.Outbreak.Commands
{
    public class UpdateOutbreakNote
    {
        [Required]
        public int OutbreakId { get; set; }

        [Required]
        public int EventId { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(1000)]
        public string Note { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string NoteType { get; set; }
    }
}
