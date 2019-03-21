using System;
using System.ComponentModel.DataAnnotations;

namespace Merlin.Core.SmartGoals.Queries
{
    [ValidDateRange("StartDate", "EndDate")]
    public class GetSmartGoalsResults
    {
        [Required(ErrorMessage = "User Name is required")]
        public string User { get; set; }
        
        [Required(ErrorMessage = "Start Date is required")]
        [NoFutureDate(ErrorMessage = "Start Date must not be future date")]      
        public DateTime? StartDate { get; set; }

        [Required(ErrorMessage = "End Date is required")]
        public DateTime? EndDate { get; set; }
    }
}
