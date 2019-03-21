using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Data
{
   public partial class ElrNote
    {
        public int NoteKey { get; set; }
        public int RequestKey { get; set; }
        public int OrderKey { get; set; }
        public int ObservationKey { get; set; }
        public string NoteSequenceID { get; set; }
        public string NoteSource { get; set; }
        public string Note { get; set; }
        public string NoteType { get; set; }
        public DateTime InsertedDateTime { get; set; }
        public DateTime UpdatedDateTime { get; set; }
        public int IsDeleted { get; set; }
    }
}
