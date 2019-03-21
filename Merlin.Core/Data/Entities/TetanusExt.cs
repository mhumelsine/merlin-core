using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class TetanusExt
    {
        public int IdCase { get; set; }
        public string DsOccupation { get; set; }
        public string InMilitary { get; set; }
        public string DsMilatary { get; set; }
        public string CdTtHistory { get; set; }
        public string DsLastDose { get; set; }
        public string InAcute { get; set; }
        public DateTime? DtAcuteWound { get; set; }
        public string CdAnatomic { get; set; }
        public string InWrkRelated { get; set; }
        public string CdEnvironment { get; set; }
        public string DsCircumstance { get; set; }
        public string CdWoundType { get; set; }
        public string InContaminated { get; set; }
        public string InWoundDepth { get; set; }
        public string InInfected { get; set; }
        public string InTissue { get; set; }
        public string InMedicalCare { get; set; }
        public string InTtAdmin { get; set; }
        public string CdTtTime { get; set; }
        public string InWoundDebr { get; set; }
        public string CdDebrTime { get; set; }
        public string InTigProph { get; set; }
        public string CdTigTime { get; set; }
        public string DsDosage { get; set; }
        public string CdAssocCondt { get; set; }
        public string DsAssocCondt { get; set; }
        public string InDiabetes { get; set; }
        public string InInsulin { get; set; }
        public string InParentDrug { get; set; }
        public string DsParentDrug { get; set; }
        public string CdTetanusDisease { get; set; }
        public string InTigTherapy { get; set; }
        public string CdTigAftOnset { get; set; }
        public string DsTotalDose { get; set; }
        public string InHospitalized { get; set; }
        public string DsHospitalized { get; set; }
        public string DsDaysIcu { get; set; }
        public string DsDaysVentil { get; set; }
        public string CdOutcome { get; set; }
        public DateTime? DtDeath { get; set; }
        public string DsOutcome { get; set; }
        public string DsMotherAge { get; set; }
        public DateTime? DtMotherDob { get; set; }
        public string InMotherTravel { get; set; }
        public DateTime? DtMotherArrivedUsa { get; set; }
        public string CdMotherTt { get; set; }
        public string DsMotherTt { get; set; }
        public string CdBirthPlace { get; set; }
        public string CdBirthAttendt { get; set; }
        public string DsBirthAttendt { get; set; }
        public string DsComments { get; set; }
        public string IdReporter { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
