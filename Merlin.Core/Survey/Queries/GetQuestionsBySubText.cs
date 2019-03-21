using Isf.Core.Cqrs;

namespace Merlin.Core.Survey.Queries
{
    public class GetQuestionsBySubText : PagedQuery
    {
        public string SubText { get; set; }
    }
}
