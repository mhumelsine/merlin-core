using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.ELRSearch.Queries
{
   public class GetProfileById
    {
        [Required(ErrorMessage = "Profile ID is required")]
        public int ProfileId { get; set; }
    }
}
