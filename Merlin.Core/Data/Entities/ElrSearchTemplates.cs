using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Data
{
   public class ElrSearchTemplates : IAuditAdded, IAuditChanged
    {
        public int Id { get; set; }
        public string CdType { get; set; }
        public string DsName { get; set; }
        public string JsData{ get; set; }
        public DateTime DtAdded { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtChanged { get; set; }
        public string IdChanged { get; set; }
    }
}
