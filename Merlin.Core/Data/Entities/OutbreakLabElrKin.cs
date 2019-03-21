using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class OutbreakLabElrKin
    {
        public int KinKey { get; set; }
        public int RequestKey { get; set; }
        public int IdOutbreak { get; set; }
        public int? IdOutbreakLab { get; set; }
        public string KinName { get; set; }
        public string KinRelationship { get; set; }
        public string KinAddress1 { get; set; }
        public string KinAddress2 { get; set; }
        public string KinCity { get; set; }
        public string KinState { get; set; }
        public string KinZip { get; set; }
        public string KinCountry { get; set; }
        public string KinEmail { get; set; }
        public string KinPhoneNumber { get; set; }
        public string ContactOrgName { get; set; }
        public string ContactOrgPerson { get; set; }
        public string ContactOrgPersonEmail { get; set; }
        public string ContactOrgPersonPhone { get; set; }
        public string ContactOrgPersonAddress1 { get; set; }
        public string ContactOrgPersonAddress2 { get; set; }
        public string ContactOrgPersonCity { get; set; }
        public string ContactOrgPersonState { get; set; }
        public string ContactOrgPersonZip { get; set; }
        public string ContactOrgPersonCountry { get; set; }
    }
}
