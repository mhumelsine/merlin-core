using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.Outbreak.Commands
{
    public class UploadDocument
    {
        public byte[] FilesBytes { get; set; }
        public string FileName { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string DocumentType { get; set; }

        [Required]
        public DateTime DocumentDate { get; set; }

        [Required]
        public int OutbreakId { get; set; }
        public int? Sequence { get; set; }

        public string MIMEType { get; set; }
    }
}
