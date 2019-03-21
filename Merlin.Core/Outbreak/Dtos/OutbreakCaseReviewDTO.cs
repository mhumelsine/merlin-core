using System;

namespace Merlin.Core.Outbreak
{
    public class OutbreakCaseReviewDTO
    {
        public string ReviewedBy { get; set; }
        public DateTime? ReviewedOn { get; set; }
        public string ReviewStatus { get; set; }
        public string Comments { get; set; }
        public bool IsSubmitted { get; set; }
    }
}
