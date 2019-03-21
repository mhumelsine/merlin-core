using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ScenarioOutcome
    {
        public int Id { get; set; }
        public int IdScenario { get; set; }
        public string DsAttribute { get; set; }
        public string DsValue { get; set; }

        public Scenario IdScenarioNavigation { get; set; }
    }
}
