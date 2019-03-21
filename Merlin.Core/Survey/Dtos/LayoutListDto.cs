using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Survey.Dtos
{
    public class LayoutListDto
    {
        public Guid LayoutId { get; set; }
        public string LayoutName { get; set; }
        public IEnumerable<string> Tags { get; set; }
        public IEnumerable<object> Surveys { get; set; }
    }
}
