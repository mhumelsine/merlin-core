using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class UserRole
    {
        public string IdUser { get; set; }
        public int IdCode { get; set; }

        public Codes IdCodeNavigation { get; set; }
        public EpiUser IdUserNavigation { get; set; }
    }
}
