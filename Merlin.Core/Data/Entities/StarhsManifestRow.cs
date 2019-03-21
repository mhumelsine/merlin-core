using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class StarhsManifestRow
    {
        public int IdManifestRow { get; set; }
        public int IdManifest { get; set; }
        public int IdLrv { get; set; }

        public LabResultValues IdLrvNavigation { get; set; }
        public StarhsManifest IdManifestNavigation { get; set; }
    }
}
