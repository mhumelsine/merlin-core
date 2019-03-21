using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Outbreak
{
    public class OutbreakEpicomDTO
    {
        public int? PostId { get; set; }

        public int? PendingPostId { get; set; }

        public int? ForumId { get; set; }

        public string ForumDescription { get; set; }

        public int? TopicId { get; set; } 

        public string TopicDescription { get; set; }

        public DateTime? Date { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public int? EpicomUserId { get; set; }

        public string Message { get; set; }

    }
}
