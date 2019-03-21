using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Resource
    {
        public Resource()
        {
            AnimalProfileIdChdNavigation = new HashSet<AnimalProfile>();
            AnimalProfileIdResourceNavigation = new HashSet<AnimalProfile>();
            EpiCase = new HashSet<EpiCase>();
            EpiCaseHospital = new HashSet<EpiCaseHospital>();
            FollowUpEpiCase = new HashSet<FollowUpEpiCase>();
            HepatitisPerinatalMotherExtIdHospitalNavigation = new HashSet<HepatitisPerinatalMotherExt>();
            HepatitisPerinatalMotherExtIdPhysicianNavigation = new HashSet<HepatitisPerinatalMotherExt>();
            LabIdLaboratoryNavigation = new HashSet<Lab>();
            LabIdOrderFacilityNavigation = new HashSet<Lab>();
            LabIdProviderNavigation = new HashSet<Lab>();
            LeadExtAdditional = new HashSet<LeadExtAdditional>();
            LegionellosisExtIdDentalHistNavigation = new HashSet<LegionellosisExt>();
            LegionellosisExtIdWorkHospitalHistNavigation = new HashSet<LegionellosisExt>();
            OutbreakLabResultsIdLaboratoryNavigation = new HashSet<OutbreakLabResults>();
            OutbreakLabResultsIdOrderFacilityNavigation = new HashSet<OutbreakLabResults>();
            OutbreakLabResultsIdProviderNavigation = new HashSet<OutbreakLabResults>();
        }

        public int IdResource { get; set; }
        public string CdResourceType { get; set; }
        public string NmResource { get; set; }
        public string NmFirst { get; set; }
        public string DsAddr1Name { get; set; }
        public string DsAddr2 { get; set; }
        public string DsCity { get; set; }
        public string CdState { get; set; }
        public string DsZip { get; set; }
        public string CdCounty { get; set; }
        public string DsPhn { get; set; }
        public string DsFax { get; set; }
        public string DsEmail { get; set; }
        public DateTime? DtEffective { get; set; }
        public DateTime? DtEnd { get; set; }
        public string InStateLab { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string InChd { get; set; }
        public bool? InMedExaminer { get; set; }
        public string IdElrLink { get; set; }
        public string InSentinel { get; set; }
        public string DsSentinelNum { get; set; }
        public string DsWeekend { get; set; }
        public bool? InRabiesLab { get; set; }
        public int? InUsed { get; set; }

        public ICollection<AnimalProfile> AnimalProfileIdChdNavigation { get; set; }
        public ICollection<AnimalProfile> AnimalProfileIdResourceNavigation { get; set; }
        public ICollection<EpiCase> EpiCase { get; set; }
        public ICollection<EpiCaseHospital> EpiCaseHospital { get; set; }
        public ICollection<FollowUpEpiCase> FollowUpEpiCase { get; set; }
        public ICollection<HepatitisPerinatalMotherExt> HepatitisPerinatalMotherExtIdHospitalNavigation { get; set; }
        public ICollection<HepatitisPerinatalMotherExt> HepatitisPerinatalMotherExtIdPhysicianNavigation { get; set; }
        public ICollection<Lab> LabIdLaboratoryNavigation { get; set; }
        public ICollection<Lab> LabIdOrderFacilityNavigation { get; set; }
        public ICollection<Lab> LabIdProviderNavigation { get; set; }
        public ICollection<LeadExtAdditional> LeadExtAdditional { get; set; }
        public ICollection<LegionellosisExt> LegionellosisExtIdDentalHistNavigation { get; set; }
        public ICollection<LegionellosisExt> LegionellosisExtIdWorkHospitalHistNavigation { get; set; }
        public ICollection<OutbreakLabResults> OutbreakLabResultsIdLaboratoryNavigation { get; set; }
        public ICollection<OutbreakLabResults> OutbreakLabResultsIdOrderFacilityNavigation { get; set; }
        public ICollection<OutbreakLabResults> OutbreakLabResultsIdProviderNavigation { get; set; }
    }
}
