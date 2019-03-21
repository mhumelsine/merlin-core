using Isf.Core.Cqrs;

namespace Merlin.Core.Survey.Queries
{
    public class GetLayoutsReferencingQuestion : PagedQuery
    {
        public string QuestionId { get; set; }
    }
}
