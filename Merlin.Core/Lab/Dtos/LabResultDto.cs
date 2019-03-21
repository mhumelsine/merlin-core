using Merlin.Core.Codes.Dtos;
using System.Collections.Generic;

namespace Merlin.Core.Lab.Dtos
{
    public class LabSummaryResultDto
    {
        public LabSummaryResultDto()
        {
            Values = new List<DropdownCode>();
        }
        public string Label { get; set; }
        public string Value { get; set; }
        public IEnumerable<DropdownCode> Values { get; set; }

    }
}
