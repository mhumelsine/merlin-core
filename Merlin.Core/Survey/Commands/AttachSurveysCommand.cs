using Isf.Core.Cqrs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.Survey.Commands
{
    public class AttachSurveys : Command
    {
        public string Name { get; set; }
        public string SurveyType { get; set; }
        public string[] ICD9Code { get; set; }
        public int?[] OutbreakId { get; set; }

        [Required]
        public Guid LayoutId { get; set; } 

        [Required(ErrorMessage = "Effective Date is required")]
        public DateTime EffectiveDate { get; set; }
    }
}

