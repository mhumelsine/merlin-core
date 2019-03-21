﻿using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class HivCase
    {
        public int Id { get; set; }
        public int IdProfile { get; set; }
        public Guid? IdHash { get; set; }
        public string DsStateno { get; set; }
        public string NmAkaFirst { get; set; }
        public string NmAkaLast { get; set; }
        public string DsVitalStatus { get; set; }
        public string DsStatus { get; set; }
        public DateTime? DtHivDx { get; set; }
        public string IdPrisno { get; set; }
        public string DsViralLoadFirst { get; set; }
        public string DsViralLoadLast { get; set; }
        public string DsCd4First { get; set; }
        public string DsCd4Last { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string DsDtAkaBirth { get; set; }
        public string DsDtHivDx { get; set; }
        public string DsDtAidsDx { get; set; }
        public string DsDtViralLoadFirst { get; set; }
        public string DsDtViralLoadLast { get; set; }
        public string DsDtCd4First { get; set; }
        public string DsDtCd4Last { get; set; }

        public EpiProfile IdProfileNavigation { get; set; }
    }
}
