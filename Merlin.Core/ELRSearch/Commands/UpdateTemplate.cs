using Merlin.Core.ELRSearch.Dtos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.ELRSearch.Commands
{
   public class UpdateTemplate
    {
        [Required(ErrorMessage = "Template Name is required")]
        public string TemplateName { get; set; }

        [Required]
        public int TemplateId { get; set; }

        public string TemplateType { get; set; }

        [MustContainAtLeastOneItem(ErrorMessage = "Please add at least one advanced search critera")]
        public ICollection<SearchCriteria> Criteria { get; set; }
    }
}
