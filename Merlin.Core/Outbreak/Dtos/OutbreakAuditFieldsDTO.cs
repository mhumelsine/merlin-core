using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Outbreak
{
    public class OutbreakAuditFieldsDTO
    {
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; } 
    }   
}
