using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SurveyLayoutQuestion 
    {
        public Guid UidLayout { get; set; }
        public string IdQuestion { get; set; }

        public virtual SurveyLayout Layout { get; set; }
    }
}
