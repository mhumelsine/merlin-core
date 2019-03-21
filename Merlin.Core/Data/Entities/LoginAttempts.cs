using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class LoginAttempts
    {
        public string IdUser { get; set; }
        public string IdIpAddress { get; set; }
        public DateTime DtLogin { get; set; }
        public int InKey { get; set; }
    }
}
