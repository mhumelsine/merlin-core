using Isf.Core.Cqrs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.Survey.Commands
{
    public class CreateObjectMapping : Command
    {
        [Required]
        public string QuestionId { get; set; }
        [Required]
        public string MappingType { get; set; }
        [Required]
        public string MappingValue { get; set; }
    }
}
