using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class EpiUserPrivileges
    {
        public string IdUser { get; set; }
        public string CdType { get; set; }
        public string DsPrivilegesType { get; set; }
        public int? IdSequence { get; set; }
        public string DsPrivilegesList { get; set; }
    }
}
