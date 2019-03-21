using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class StarhsManifest
    {
        public StarhsManifest()
        {
            StarhsManifestRow = new HashSet<StarhsManifestRow>();
        }

        public int IdManifest { get; set; }
        public string NmManifest { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }

        public ICollection<StarhsManifestRow> StarhsManifestRow { get; set; }
    }
}
