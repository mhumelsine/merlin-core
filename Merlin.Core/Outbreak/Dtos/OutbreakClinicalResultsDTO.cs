using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core.Outbreak
{
    public class OutbreakClinicalResultsDTO
    {
        public List<String> Symptom { get; set; }
        public string OtherSymptom { get; set;}

        [DataType(DataType.Date)]
        [NoFutureDate]
        public DateTime? FirstExposureDate { get; set; }

        [DataType(DataType.Date)]
        [NoFutureDate]
        public DateTime? LastExposureDate { get; set; }

        [DataType(DataType.Date)]
        [NoFutureDate]
        public DateTime? FirstOnsetDate { get; set; }

        [DataType(DataType.Date)]
        [NoFutureDate]
        public DateTime? LastOnsetDate { get; set; }
        public string Duration { get; set; }
        public string TimeUnit { get; set; }
        public DateTime? OutbreakEventDate { get; set; }
    }
}
