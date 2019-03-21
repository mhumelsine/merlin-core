using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Data
{
    public partial class SurveyLayoutTag
    {
        public Guid UidLayout { get; set; }
        public string DsTag { get; set; }

        public virtual SurveyLayout Layout { get; set; }
    }
}
