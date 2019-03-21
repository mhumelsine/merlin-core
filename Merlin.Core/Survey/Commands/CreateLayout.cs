using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.Survey.Commands
{
    public class CreateLayout
    {
        [Required]
        public string LayoutName { get; set; }
        public IEnumerable<string> Tags { get; set; }

    }
}
