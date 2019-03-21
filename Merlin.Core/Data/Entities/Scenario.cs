using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Scenario
    {
        public Scenario()
        {
            ScenarioOutcome = new HashSet<ScenarioOutcome>();
        }

        public int Id { get; set; }
        public int IdScenarioRule { get; set; }
        public string CdType { get; set; }
        public string DsName { get; set; }
        public int? DsPriority { get; set; }

        public ScenarioRule IdScenarioRuleNavigation { get; set; }
        public ICollection<ScenarioOutcome> ScenarioOutcome { get; set; }
    }
}
