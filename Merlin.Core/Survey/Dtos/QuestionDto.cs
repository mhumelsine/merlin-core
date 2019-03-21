using Merlin.Core.Codes.Dtos;
using System;
using System.Collections.Generic;

namespace Merlin.Core.Survey.Dtos
{
    public class QuestionDto
    {
        public Guid UID { get; set; }
        public string QuestionId { get; set; }
        public string QuestionText { get; set; }
        public string QuestionType { get; set; }
        public string CodeType { get; set; }
        public IEnumerable<DropdownCode> Choices { get; set; }
        public bool SaveToBank { get; set; }
        public bool HasBeenAnswered { get; set; }
    }
}
