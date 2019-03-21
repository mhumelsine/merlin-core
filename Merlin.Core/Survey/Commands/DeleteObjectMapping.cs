using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.Survey.Commands
{
    public class DeleteObjectMapping
    {
        [Required]
        public string QuestionId { get; set; }
        [Required]
        public string MappingType { get; set; }
    }
}
