using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public class ValidDateRangeAttribute : ValidationAttribute
    {
        private readonly string start;
        private readonly string end;

        public ValidDateRangeAttribute(string start, string end)
        {
            this.start = start;
            this.end = end;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var type = validationContext.ObjectType;

            var startProperty = type.GetProperty(start);
            var endProperty = type.GetProperty(end);

            var startDate = startProperty.GetValue(validationContext.ObjectInstance) as DateTime?;
            var endDate = endProperty.GetValue(validationContext.ObjectInstance) as DateTime?;

            if(startDate.HasValue && endDate.HasValue)
            {
                if (startDate > endDate)
                {
                    return new ValidationResult($"{start} must be on or before {end}", new string[] { start, end });
                }
            }

            return ValidationResult.Success;
        }
    }
}
