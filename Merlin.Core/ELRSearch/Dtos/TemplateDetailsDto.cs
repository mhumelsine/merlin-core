using System.Collections.Generic;


namespace Merlin.Core.ELRSearch.Dtos
{
   public class TemplateDetailsDto
    {
        public string TemplateName { get; set; }
        public int    TemplateID { get; set; }
        public string TemplateType { get; set; }
        public ICollection<SearchCriteria> Criteria { get; set; }
    }
}
