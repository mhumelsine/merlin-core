using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.Outbreak.Commands
{
    public class SubmitEpicomPost
    {
        public string EpiComUserId { get; set; }

        [Required]
        public int OutbreakId { get; set; }

        public int? PendingPostId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Forum ID is required")]
        public int ForumId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Topic ID is required")]
        public int TopicId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Message { get; set; }

        public string IdSubmitted { get; set; }
    }
}
