using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.Outbreak.Commands
{
    public class DeleteDocument
    {
        [Required]
        public int Id { get; set; }
    }
}
