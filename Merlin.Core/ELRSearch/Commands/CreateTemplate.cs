using Merlin.Core.ELRSearch.Dtos;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Merlin.Core.ELRSearch.Commands
{
    public class CreateTemplate
    {
        [Required(ErrorMessage = "Template Name is required")]
        public string TemplateName { get; set; }

        public int TemplateId { get; set; }

        public string TemplateType { get; set; }

        [MustContainAtLeastOneItem(ErrorMessage = "Please add at least one advanced search critera")]
        public ICollection<SearchCriteria> Criteria { get; set; }
    }
}
