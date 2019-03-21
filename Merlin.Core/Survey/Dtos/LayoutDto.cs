using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Survey.Dtos
{
    public class LayoutDto
    {
        public Guid LayoutId { get; set; }
        public string LayoutName { get; set; }
        public IList<string> Tags { get; set; }
        public IList<LayoutItemDto> Items { get; set; }
        public IList<SurveyListDto> Surveys { get; set; }
        public DateTime SavedOn { get; set; }
    }
}
