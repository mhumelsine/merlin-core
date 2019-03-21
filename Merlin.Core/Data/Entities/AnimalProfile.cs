using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class AnimalProfile
    {
        public AnimalProfile()
        {
            OutbreakLabResults = new HashSet<OutbreakLabResults>();
        }

        public int IdAnimalProfile { get; set; }
        public int? IdOwner { get; set; }
        public int? IdResource { get; set; }
        public int? IdCase { get; set; }
        public string CdAnimal { get; set; }
        public string CdAnimalType { get; set; }
        public string DsAnimalType { get; set; }
        public string CdSpecies { get; set; }
        public string DsBreed { get; set; }
        public string DsColor { get; set; }
        public string InCatColony { get; set; }
        public string InInoculated { get; set; }
        public DateTime? DtInoculated { get; set; }
        public string CdReasonTested { get; set; }
        public DateTime? DtExposure { get; set; }
        public string CdTypeExposure { get; set; }
        public string InHeadNeck { get; set; }
        public string DsNotes { get; set; }
        public string NmRptPerson { get; set; }
        public string DsRptPersonPhn { get; set; }
        public string DsRptPersonAlternatePhn { get; set; }
        public string DsAddr1NameFound { get; set; }
        public string DsAddr2NameFound { get; set; }
        public string DsCityFound { get; set; }
        public string CdStateFound { get; set; }
        public string DsZipFound { get; set; }
        public string CdCountyFound { get; set; }
        public string CdDeathType { get; set; }
        public DateTime? DtDeath { get; set; }
        public int? IdChd { get; set; }
        public DateTime? DtLabSent { get; set; }
        public DateTime? DtCollected { get; set; }
        public string CdCarrier { get; set; }
        public string DsTrackingNbr { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string IdAnimal { get; set; }
        public int? IdVictim { get; set; }
        public string CdSymptoms { get; set; }
        public string DsOtherSymptoms { get; set; }
        public string DsOtherDeathType { get; set; }
        public string DsOtherExposureType { get; set; }
        public string CdExposureSite { get; set; }
        public string DsOtherExposureSite { get; set; }
        public string DsComments { get; set; }

        public Resource IdChdNavigation { get; set; }
        public Resource IdResourceNavigation { get; set; }
        public AnimalVictim IdVictimNavigation { get; set; }
        public ICollection<OutbreakLabResults> OutbreakLabResults { get; set; }
    }
}
