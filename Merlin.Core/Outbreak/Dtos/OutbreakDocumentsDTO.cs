using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Outbreak
{
    public class OutbreakDocumentsDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string FileName { get; set; }
        public string DocumentType { get; set; }
        public DateTime DocumentDate { get; set; }
        public string UserAdded { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
