using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ScenarioSingleRule
    {
        public int Id { get; set; }
        public string DsAttribute { get; set; }
        public string CdOperator { get; set; }
        public string DsValue { get; set; }

        public ScenarioRule IdNavigation { get; set; }
    }
}
