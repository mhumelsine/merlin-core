using Isf.Core.Cqrs;
using Merlin.Core.ELRSearch.Dtos;
using System.Collections.Generic;

namespace Merlin.Core.ELRSearch.Queries
{
    public class SearchElr : PagedQuery
    {
        [MustContainAtLeastOneItem(ErrorMessage = "Please enter search critera")]
        public ICollection<SearchCriteria> Criteria { get; set; }
    }
}
