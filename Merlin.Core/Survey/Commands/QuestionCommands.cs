using Isf.Core.Cqrs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.Survey.Commands
{
    public class CreateQuestion : Command
    {
        [Required]
        public string QuestionText { get; set; }
        [Required]
        public string QuestionType { get; set; }
        public string CodeType { get; set; }
        public bool SaveToBank { get; set; }
        public bool HasBeenAnswered { get; set; }
        public string UserId { get; set; }
    }

    public class UpdateQuestion : CommandWithUID
    {
        public string QuestionId { get; set; }
        [Required]
        public string QuestionText { get; set; }
        [Required]
        public string QuestionType { get; set; }
        public string CodeType { get; set; }
        public bool SaveToBank { get; set; }
        public bool HasBeenAnswered { get; set; }
        public string UserId { get; set; }
    }
}
