using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class PediatricFluExt2
    {
        public int IdCase { get; set; }
        public string InCultureSpecimen { get; set; }
        public string CdCultureSpecimenType { get; set; }
        public string DsCultureSpecimenTypeOther { get; set; }
        public DateTime? DtCultureCollection { get; set; }
        public string InCultureResult { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public PediatricFluExt IdCaseNavigation { get; set; }
    }
}
