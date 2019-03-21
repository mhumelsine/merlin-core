using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ScenarioRule
    {
        public ScenarioRule()
        {
            InverseIdParentRuleNavigation = new HashSet<ScenarioRule>();
            Scenario = new HashSet<Scenario>();
        }

        public int Id { get; set; }
        public int? IdParentRule { get; set; }
        public string DsDesc { get; set; }

        public ScenarioRule IdParentRuleNavigation { get; set; }
        public ScenarioRuleGroup ScenarioRuleGroup { get; set; }
        public ScenarioSingleRule ScenarioSingleRule { get; set; }
        public ICollection<ScenarioRule> InverseIdParentRuleNavigation { get; set; }
        public ICollection<Scenario> Scenario { get; set; }
    }
}
