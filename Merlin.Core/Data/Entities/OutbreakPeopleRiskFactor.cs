using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakPeopleRiskFactor
    {
        public int IdOutbreak { get; set; }
        public int IdPeople { get; set; }
        public int IdQuestion { get; set; }
        public string InAnswer { get; set; }
        public string DsFreeFormAnswer { get; set; }
    }
}
