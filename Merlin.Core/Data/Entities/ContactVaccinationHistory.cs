using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ContactVaccinationHistory
    {
        public int IdCase { get; set; }
        public int IdContact { get; set; }
        public string CdContactType { get; set; }
        public string CdTestType { get; set; }
        public short VaccHistoryCtr { get; set; }
        public DateTime? DtAdminstered { get; set; }
        public string NmAdministrator { get; set; }
        public string DsDosage { get; set; }
        public string NmManufacturer { get; set; }
        public string DsResult { get; set; }
    }
}
