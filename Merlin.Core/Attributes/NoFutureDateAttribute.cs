using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core
{
    public class NoFutureDateAttribute : ValidationAttribute
    {
        private const string defaultErrorMessage = "Must not be a future date";

        public override bool IsValid(object value)
        {
            DateTime? date = value as DateTime?;

            if (date == null)
            {
                return true;
            }

            return date.Value.Date <= DateTime.Today.Date;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (!IsValid(value))
            {
                return new ValidationResult(ErrorMessage ?? defaultErrorMessage);
            }

            return ValidationResult.Success;
        }
    }
}
