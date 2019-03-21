using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class PertussisExt
    {
        public int IdCase { get; set; }
        public string InWhoop { get; set; }
        public string InVomit { get; set; }
        public string InApnea { get; set; }
        public DateTime? DtFinalInterv { get; set; }
        public string InCoughFinal { get; set; }
        public string DsCoughDuration { get; set; }
        public string InXray { get; set; }
        public string InSeizures { get; set; }
        public string InEncephal { get; set; }
        public string InHospitalized { get; set; }
        public string InDeath { get; set; }
        public string InAntibiot { get; set; }
        public string Cd1stAntibiot { get; set; }
        public DateTime? Dt1stStarted { get; set; }
        public string DsDays1stAntibiot { get; set; }
        public string Cd2ndAntibiot { get; set; }
        public DateTime? Dt2ndStarted { get; set; }
        public string DsDays2ndAntibiot { get; set; }
        public string CdCultureResult { get; set; }
        public DateTime? DtCulture { get; set; }
        public string CdDfaResult { get; set; }
        public DateTime? DtDfa { get; set; }
        public string CdSerolResult { get; set; }
        public DateTime? DtSerol1 { get; set; }
        public DateTime? DtSerol2 { get; set; }
        public string CdPcrResult { get; set; }
        public DateTime? DtPcr { get; set; }
        public string InVaccinated { get; set; }
        public DateTime? DtLastPertussis { get; set; }
        public string CdVac1Mfg { get; set; }
        public string CdDoses { get; set; }
        public string CdReason { get; set; }
        public DateTime? DtInvestgStarted { get; set; }
        public string InEpiLinked { get; set; }
        public string CdTransmission { get; set; }
        public string DsTransmission { get; set; }
        public string CdSpread { get; set; }
        public string DsSpread { get; set; }
        public string DsContacts { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsEpiLinkComments { get; set; }
        public string CdNoVaccineReason { get; set; }
    }
}
