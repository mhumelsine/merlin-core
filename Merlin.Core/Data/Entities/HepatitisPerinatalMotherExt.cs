using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class HepatitisPerinatalMotherExt
    {
        public int IdCase { get; set; }
        public string DsCountyCaseNumber { get; set; }
        public string InMotherHbsag { get; set; }
        public string InMedicaid { get; set; }
        public string InRefugee { get; set; }
        public string CdCountryBirth { get; set; }
        public string InTranslator { get; set; }
        public string NmTranslator { get; set; }
        public string DsTranslatorPhone { get; set; }
        public DateTime? DtEstDelivery { get; set; }
        public DateTime? DtNotifiedHbsag { get; set; }
        public string InMultiBirth { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdCounty { get; set; }
        public string CdClosureReason { get; set; }
        public string DsClosure { get; set; }
        public DateTime? DtClosure { get; set; }
        public string InMotherMonitored { get; set; }
        public int? IdPhysician { get; set; }
        public string InMotherTreated { get; set; }
        public string InHealthDeptRefer { get; set; }
        public string CdPrimaryLanguage { get; set; }
        public string InPrimaryLanguageRead { get; set; }
        public string CdCountryBirthGrandmother { get; set; }
        public string CdReportedBy { get; set; }
        public string CdReportType { get; set; }
        public string CdReportedByAdditional { get; set; }
        public string CdReportTypeAdditional { get; set; }
        public int? IdHospital { get; set; }
        public string CdMotherClassified { get; set; }

        public Resource IdHospitalNavigation { get; set; }
        public Resource IdPhysicianNavigation { get; set; }
    }
}
