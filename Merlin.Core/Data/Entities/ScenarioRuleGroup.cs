using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ScenarioRuleGroup
    {
        public int Id { get; set; }
        public string CdLogicalOperator { get; set; }

        public ScenarioRule IdNavigation { get; set; }
    }
}
