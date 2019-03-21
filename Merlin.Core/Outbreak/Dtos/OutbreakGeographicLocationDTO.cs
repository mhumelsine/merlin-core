using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.Outbreak
{
    public class OutbreakGeographicLocationDTO
    {
        public int Id { get; set; }
        [Required]
        public string County { get; set; }
        public string OtherCountiesAffected { get; set; }
        public List<string> OtherCountiesList { get; set; }
        public string OtherStatesAffected { get; set; }
        public List<string> OtherStatesList { get; set; }
        public List<string> OtherCountriesList { get; set; }

    }
}
