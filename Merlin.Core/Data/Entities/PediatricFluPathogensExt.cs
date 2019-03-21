using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class PediatricFluPathogensExt
    {
        public int IdCultConfirm { get; set; }
        public int IdCase { get; set; }
        public string InCultureSpecimen { get; set; }
        public string CdCultureSpecimenType { get; set; }
        public string DsCultureSpecimenTypeOther { get; set; }
        public DateTime? DtCultureCollection { get; set; }
        public string InCultureResult { get; set; }
        public string InCultureOrganism { get; set; }
        public string DsCultureOrganismOther { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
