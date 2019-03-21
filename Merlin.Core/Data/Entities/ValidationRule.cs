using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class ValidationRule
    {
        public int Id { get; set; }
        public string NmValidation { get; set; }
        public string CdType { get; set; }
        public string DsDefaultError { get; set; }
    }
}
