using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class StrepPneumoExt
    {
        public int IdCase { get; set; }
        public string InLongTermFacility { get; set; }
        public string DsFacility { get; set; }
        public string DsCity { get; set; }
        public string InForeign { get; set; }
        public string DsCountry { get; set; }
        public string InHospitalized { get; set; }
        public string InDeath { get; set; }
        public string DsOrganismOther { get; set; }
        public string InPriorMedical { get; set; }
        public string InPersistent { get; set; }
        public string DsMedicalOther { get; set; }
        public string InPolyPneuVax { get; set; }
        public string InConjuPneuVax { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsInfectOrganism { get; set; }
        public string DsMedicalCondition { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
