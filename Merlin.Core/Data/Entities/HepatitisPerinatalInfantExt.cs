using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class HepatitisPerinatalInfantExt
    {
        public int IdCase { get; set; }
        public int IdInfant { get; set; }
        public string NmLast { get; set; }
        public string NmFirst { get; set; }
        public DateTime? DtBirth { get; set; }
        public string CdGenderInfant { get; set; }
        public int? IdPediatrician { get; set; }
        public DateTime? DtSpecimenCollected { get; set; }
        public int? IdLab { get; set; }
        public DateTime? DtSpecimenCollected2 { get; set; }
        public int? IdLab2 { get; set; }
        public string DsNotes { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string AmBirthTime { get; set; }
        public string InAddrSame { get; set; }
        public string DsAddr1Name { get; set; }
        public string DsAddr2 { get; set; }
        public string DsCity { get; set; }
        public string CdState { get; set; }
        public string DsZip { get; set; }
        public string CdCounty { get; set; }
        public string DsPhone { get; set; }
        public string CdClosureReason { get; set; }
        public string DsClosure { get; set; }
        public DateTime? DtClosure { get; set; }
        public string InWeightUnder2000 { get; set; }
        public string InInfantEntered { get; set; }
        public int? IdCaseInfant { get; set; }
        public string InInfantEntered2 { get; set; }
        public int? IdCaseInfant2 { get; set; }
    }
}
