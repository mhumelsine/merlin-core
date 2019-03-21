using Merlin.Core.Codes.Dtos;
using System.Collections.Generic;

namespace Merlin.Core.Case
{
    public class ExposureLocationDto
    {
        public ExposureLocationDto()
        {
            LocationsExposed = new List<DropdownCode>();
            Imported = new List<DropdownCode>();
        }
        public IEnumerable<DropdownCode> LocationsExposed { get; set; }
        public IEnumerable<DropdownCode> Imported { get; set; }
    }

   }
