using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class PesticideProductExt
    {
        public int IdProduct { get; set; }
        public int IdCase { get; set; }
        public string NmPesticide { get; set; }
        public string DsEpaRegistrationNum { get; set; }
        public string DsEpaDistributorNum { get; set; }
        public string DsActiveIngredientPct { get; set; }
        public string CdChemicalClass { get; set; }
        public string CdProductClass { get; set; }
        public string CdFunctionalClass { get; set; }
        public string CdPhysicalFormulation { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
