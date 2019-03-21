using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ArboviralExt
    {
        public int IdCase { get; set; }
        public string InHomeless { get; set; }
        public DateTime? DtLastFollowUp { get; set; }
        public string InScreenedWindows { get; set; }
        public string InMosquitoBite { get; set; }
        public string DsMosquitoBite { get; set; }
        public string InSmoker { get; set; }
        public string InSmokeOutdoors { get; set; }
        public string InExtendedOutdoors { get; set; }
        public string InMosquitoPrevention { get; set; }
        public string DsMosquitoPrevention { get; set; }
        public string InMosquitoRepellant { get; set; }
        public string InDeetRepellant { get; set; }
        public string InOutsideCounty { get; set; }
        public string DsOutsideCounty { get; set; }
        public string InOutsideFlorida { get; set; }
        public string DsOutsideFlorida { get; set; }
        public string InOutsideUs { get; set; }
        public string DsOutsideUs { get; set; }
        public string InUnderlyingMedical { get; set; }
        public string DsUnderlyingMedical { get; set; }
        public string DsOccupation { get; set; }
        public string InTransfusion { get; set; }
        public string DsTransfusion { get; set; }
        public string InDonatedBlood { get; set; }
        public string DsDonatedBlood { get; set; }
        public string InPregnant { get; set; }
        public string DsWeeksPregnant { get; set; }
        public DateTime? DtDue { get; set; }
        public string InBreastfeeding { get; set; }
        public string InYellowFeverVaccine { get; set; }
        public DateTime? DtYellowFeverVaccine { get; set; }
        public string InJapaneseEncephVaccine { get; set; }
        public DateTime? DtJapaneseEncepVaccine { get; set; }
        public string InEuropeanEncepVaccine { get; set; }
        public DateTime? DtEuropeanEncepVaccine { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsComments { get; set; }
        public string InFebrile { get; set; }
        public string InAnyoneTraveled { get; set; }
        public string InPrevDiag { get; set; }
        public string CdPrevDiagYear { get; set; }
        public string CdPrevDiagSerotype { get; set; }
        public string CdPrevDiagCountry { get; set; }
        public string InTravelEndemic { get; set; }
        public DateTime? DtReturned { get; set; }
        public DateTime? DtFebrileOnset { get; set; }
        public string CdCountryVisited { get; set; }
        public string InMosquitoNotified { get; set; }
        public DateTime? DtMosquitoNotified { get; set; }
        public string InSpecimenForwarded { get; set; }
        public DateTime? DtSpecimenRequested { get; set; }
        public DateTime? DtPrevDiag { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
