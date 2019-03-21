using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class MeaslesExt
    {
        public int IdCase { get; set; }
        public string InRash { get; set; }
        public DateTime? DtRash { get; set; }
        public string DsRashDuration { get; set; }
        public string InRashGeneral { get; set; }
        public string InFever { get; set; }
        public string DsFever { get; set; }
        public string InCough { get; set; }
        public string InCoryza { get; set; }
        public string InConjunct { get; set; }
        public string InDiarrhea { get; set; }
        public string InPneumon { get; set; }
        public string InEncephal { get; set; }
        public string InOtitis { get; set; }
        public string InThrombo { get; set; }
        public string InDeath { get; set; }
        public string InOther { get; set; }
        public string DsOther { get; set; }
        public string InHospitalized { get; set; }
        public string DsHospitalized { get; set; }
        public string InVaccine { get; set; }
        public string CdIgmResult { get; set; }
        public DateTime? DtIgm { get; set; }
        public string CdIggResult { get; set; }
        public DateTime? DtAcute { get; set; }
        public DateTime? DtConvalescent { get; set; }
        public string CdOtherLabResult { get; set; }
        public string DsLabMethod { get; set; }
        public string CdNotVacReason { get; set; }
        public DateTime? DtVac1 { get; set; }
        public DateTime? DtVac2 { get; set; }
        public DateTime? DtVac3 { get; set; }
        public DateTime? DtVac4 { get; set; }
        public string InDoseB4 { get; set; }
        public string InDoseAfter { get; set; }
        public string CdNotVacB41stDob { get; set; }
        public string CdNotVacAfter1stDob { get; set; }
        public DateTime? DtCaseInvestg { get; set; }
        public string CdTransmission { get; set; }
        public string DsTransmission { get; set; }
        public string InEpiLinked { get; set; }
        public string InTraceable { get; set; }
        public string InRashKnown { get; set; }
        public string InTravel { get; set; }
        public string DsLocation { get; set; }
        public string DsTotalMmrAdmn { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
