using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.ELRSearch.Queries
{
   public class GetProfileByStateNo
    {
        [Required(ErrorMessage = "Stateno cannot be blank")]
        public string Stateno { get; set; }
    }
}
