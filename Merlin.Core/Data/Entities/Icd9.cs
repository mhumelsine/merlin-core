using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Icd9
    {
        public Icd9()
        {
            EpiUserAlerts = new HashSet<EpiUserAlerts>();
            Icd9Relation = new HashSet<Icd9Relation>();
            Icd9Symptom = new HashSet<Icd9Symptom>();
            LabTestIcd9 = new HashSet<LabTestIcd9>();
            SymptomSet = new HashSet<SymptomSet>();
        }

        public string CdIcd9 { get; set; }
        public string NmIcd9 { get; set; }
        public string InActive { get; set; }
        public string CdFamily { get; set; }
        public string CdCdc { get; set; }
        public string InNeedsReview { get; set; }
        public string InExtdData { get; set; }
        public string InCaseDefinition { get; set; }
        public string CdOrganism { get; set; }
        public string InSerogroup { get; set; }
        public string InFollowUp { get; set; }
        public string CdDisplayAs { get; set; }
        public string CdTestValue { get; set; }
        public DateTime? DtExpired { get; set; }
        public string CdEpiLinkFamily { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string InNonReportable { get; set; }
        public string InHighPriority { get; set; }
        public string DsDxStatusFile { get; set; }
        public bool? InEmailAlert { get; set; }
        public string DsExtdDataLink { get; set; }
        public bool? InDisplayAnimalExposure { get; set; }
        public DateTime? DtEffective { get; set; }
        public bool? InArbonet { get; set; }
        public bool? InNeedsCrf { get; set; }
        public string DsReport { get; set; }
        public byte? InExcludeNetss { get; set; }
        public bool? InGenericMsg { get; set; }
        public string DsValidTests { get; set; }
        public string CdExtendedGroup { get; set; }
        public string DsEvaluation { get; set; }
        public bool InShowAntimicroAgents { get; set; }
        public string DsElrKeywords { get; set; }
        public string CdTestValueProb { get; set; }
        public string CdTestValueSusp { get; set; }
        public string DsValidTestsProb { get; set; }
        public string DsValidTestsSusp { get; set; }
        public short? AmWithin { get; set; }
        public bool? InNeedsCrfProb { get; set; }
        public bool? InNeedsCrfSusp { get; set; }
        public string DsCaseGroup { get; set; }
        public string DsReviewer { get; set; }
        public string InNonNegative { get; set; }
        public string CdCodsCategory { get; set; }
        public string DsAutoAttach { get; set; }
        public string DsLeaveUnattached { get; set; }
        public string DsAutoCreate { get; set; }
        public bool? InAutoImport { get; set; }
        public bool? InFlip { get; set; }
        public string CdIcd9FlipTo { get; set; }
        public bool? InAutoReport { get; set; }
        public string DsAutoReportAge { get; set; }
        public string DsAutoReportDx { get; set; }
        public bool? InEssenceExtract { get; set; }
        public bool? InCharts { get; set; }
        public string CdChartsTopic { get; set; }
        public string CdChartsGroup { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public bool? InHl7Format { get; set; }
        public string CdHl7Concept { get; set; }
        public string DsHl7Concept { get; set; }
        public string DsHl7ConceptSystem { get; set; }
        public string DsChartsGroup { get; set; }

        public ICollection<EpiUserAlerts> EpiUserAlerts { get; set; }
        public ICollection<Icd9Relation> Icd9Relation { get; set; }
        public ICollection<Icd9Symptom> Icd9Symptom { get; set; }
        public ICollection<LabTestIcd9> LabTestIcd9 { get; set; }
        public ICollection<SymptomSet> SymptomSet { get; set; }
    }
}
