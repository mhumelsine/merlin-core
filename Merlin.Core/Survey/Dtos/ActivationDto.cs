using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Merlin.Core.Survey.Dtos
{
    public  class ActivationDto {
        public string TriggerQuestionId { get; set; }
        public string Operator { get; set; }
        public dynamic TriggerValues { get; set; }
        public string InitialState { get; set; }
        public string ActivationType { get; set; }
    }
}
