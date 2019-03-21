using Merlin.Core.Survey.Dtos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Merlin.Core.Survey.Commands
{
    public class UpdateLayout
    {
        public Guid LayoutId { get; set; }
        public IList<LayoutItemDto> Items { get; set; }
        public IEnumerable<string> Tags { get; set; }
        [Required]
        public string LayoutName { get; set; }
    }
}
