using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Assignment
    {
        public Assignment()
        {
            InverseIdPreviousAssignmentNavigation = new HashSet<Assignment>();
        }

        public int Id { get; set; }
        public int? IdProfile { get; set; }
        public int IdFamily { get; set; }
        public int? IdPreviousAssignment { get; set; }
        public string CdCounty { get; set; }
        public string CdRoleAssigned { get; set; }
        public string CdAssignment { get; set; }
        public string CdAction { get; set; }
        public string CdDisposition { get; set; }
        public string IdAssigned { get; set; }
        public DateTime DtAssigned { get; set; }
        public string IdResolved { get; set; }
        public DateTime? DtResolved { get; set; }
        public DateTime? DtPrinted { get; set; }

        public Family IdFamilyNavigation { get; set; }
        public Assignment IdPreviousAssignmentNavigation { get; set; }
        public EpiProfile IdProfileNavigation { get; set; }
        public ICollection<Assignment> InverseIdPreviousAssignmentNavigation { get; set; }
    }
}
