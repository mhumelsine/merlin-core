using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class MumpsRubellaExt
    {
        public int IdCase { get; set; }
        public string InParotitis { get; set; }
        public string InMeningitis { get; set; }
        public string InDeafness { get; set; }
        public string InOrchitis { get; set; }
        public string InEncephal { get; set; }
        public string InOther { get; set; }
        public string DsOther { get; set; }
        public string InHospitalized { get; set; }
        public string DsHospitalized { get; set; }
        public string InDeath { get; set; }
        public string CdIgmResult { get; set; }
        public DateTime? DtIgm { get; set; }
        public string CdIggResult { get; set; }
        public DateTime? DtIgg { get; set; }
        public DateTime? DtAcute { get; set; }
        public DateTime? DtConvalescent { get; set; }
        public string CdOtherLabResult { get; set; }
        public string DsLabMethod { get; set; }
        public string InVaccine { get; set; }
        public DateTime? DtDose1 { get; set; }
        public DateTime? DtDose2 { get; set; }
        public DateTime? DtDose3 { get; set; }
        public DateTime? DtDose4 { get; set; }
        public string InDoseAfter { get; set; }
        public string CdVacReason { get; set; }
        public DateTime? DtCaseInvesting { get; set; }
        public string CdTransmission { get; set; }
        public string DsTransmission { get; set; }
        public string InEpiLinked { get; set; }
        public string InRash { get; set; }
        public DateTime? DtRash { get; set; }
        public string DsRashDuration { get; set; }
        public string InFever { get; set; }
        public string DsFever { get; set; }
        public string InArthralg { get; set; }
        public string InLymphade { get; set; }
        public string InConjunct { get; set; }
        public string InArthritic { get; set; }
        public string InThrombo { get; set; }
        public string InPregnant { get; set; }
        public string CdGestatio { get; set; }
        public string InPriorImmunity { get; set; }
        public string DsYrSerolTest { get; set; }
        public string DsAgeSerolTest { get; set; }
        public string InPrevRubella { get; set; }
        public string DsYrRubella { get; set; }
        public string DsRubellaAge { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
