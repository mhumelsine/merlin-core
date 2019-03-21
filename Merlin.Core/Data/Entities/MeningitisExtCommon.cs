using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class MeningitisExtCommon
    {
        public int IdCase { get; set; }
        public string InHospital { get; set; }
        public string DsHospital { get; set; }
        public DateTime? DtAdmitted { get; set; }
        public DateTime? DtDischarged { get; set; }
        public string DsHospitalRm { get; set; }
        public string DsMedication { get; set; }
        public string DsXray { get; set; }
        public string InDeath { get; set; }
        public string DsAge { get; set; }
        public string DsAgeType { get; set; }
        public string DsOtherSterile { get; set; }
        public string InCellulitis { get; set; }
        public string InPrimBacteram { get; set; }
        public string InConjunct { get; set; }
        public string InEpiglottitis { get; set; }
        public string InMeningitis { get; set; }
        public string InOtitis { get; set; }
        public string InPericarditis { get; set; }
        public string InPeritonitis { get; set; }
        public string InPneumonia { get; set; }
        public string InSepticArthritis { get; set; }
        public string InOrganismOther { get; set; }
        public string DsOrganismOther { get; set; }
        public string InIsolatedBlood { get; set; }
        public string InIsolatedCsf { get; set; }
        public string InIsolatedJoint { get; set; }
        public string InIsolatedPericardial { get; set; }
        public string InIsolatedPeritoneal { get; set; }
        public string InIsolatedPleural { get; set; }
        public string InIsolatedPlacenta { get; set; }
        public string InSsIsolatedOther { get; set; }
        public string DsSsIsolatedOther { get; set; }
        public DateTime? DtFirstPostCult { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
