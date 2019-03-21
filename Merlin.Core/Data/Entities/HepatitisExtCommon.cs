using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class HepatitisExtCommon
    {
        public int IdCase { get; set; }
        public string InPregnant { get; set; }
        public DateTime? DtDelivery { get; set; }
        public string InHospitalized { get; set; }
        public string DsHospital { get; set; }
        public string InDeath { get; set; }
        public string InHepA2dose { get; set; }
        public string DsHepA2doseYr { get; set; }
        public string InHepB3dose { get; set; }
        public string DsHepB3doseYr { get; set; }
        public string InHepBAntiTest { get; set; }
        public string InHepBAntibodyResult { get; set; }
        public string InReasonAcute { get; set; }
        public string InReasonLiver { get; set; }
        public string InReasonRepRisks { get; set; }
        public string InReasonDonor { get; set; }
        public string InReasonPrevious { get; set; }
        public string InReasonNoRisks { get; set; }
        public string InReasonUnknown { get; set; }
        public string InReasonOther { get; set; }
        public string DsReasonOther { get; set; }
        public string CdBloodSource { get; set; }
        public string DsSourceOther { get; set; }
        public string InSymptomatic { get; set; }
        public string AmHepADoses { get; set; }
        public string InImmuneGlobulin { get; set; }
        public string DsImmuneGlobulinYr { get; set; }
        public string DsImmuneGlobulinMth { get; set; }
        public string AmHepBDoses { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string InInvasiveProcedure { get; set; }
        public string InReasonBirthYear { get; set; }
        public string InAwarePriorTest { get; set; }
        public string InProviderCare { get; set; }
        public string InDiabetes { get; set; }
        public DateTime? DtDiabetes { get; set; }
    }
}
