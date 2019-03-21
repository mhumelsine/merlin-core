using Isf.Core.Cqrs;
using System.Collections.Generic;


namespace Merlin.Core.Survey.Queries
{
    public class GetLayoutsByTags : PagedQuery
    {
        public IEnumerable<string> Tags { get; set; }

    }
}
