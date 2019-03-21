using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class TravelHistory
    {
        public int IdTravelHistory { get; set; }
        public int? IdCase { get; set; }
        public string NmFacility { get; set; }
        public string DsAddress1 { get; set; }
        public string DsAddress2 { get; set; }
        public string DsCity { get; set; }
        public string CdState { get; set; }
        public string DsZip { get; set; }
        public string DsPhone { get; set; }
        public string DsRoomNumber { get; set; }
        public DateTime? DtStayBegin { get; set; }
        public DateTime? DtStayEnd { get; set; }
        public string InHottubSpa { get; set; }
        public string DsComments { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string CdCountry { get; set; }
        public string CdTravelType { get; set; }
        public string CdCounty { get; set; }
        public string InUsAddress { get; set; }
        public string InMostLikely { get; set; }
        public string CdTraveler { get; set; }
        public string CdRegion { get; set; }

        public EpiCase IdCaseNavigation { get; set; }
    }
}
