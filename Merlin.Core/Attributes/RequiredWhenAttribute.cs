using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Merlin.Core
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class RequiredWhenAttribute : RequiredAttribute
    {
        private readonly string propertyToCompare;
        private readonly object valueToCompare;

        public RequiredWhenAttribute(string propertyToCompare, object valueToCompare)
        {
            this.propertyToCompare = propertyToCompare;
            this.valueToCompare = valueToCompare;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var type = validationContext.ObjectType;

            var property = type.GetProperty(propertyToCompare);
            var propertyValue = property.GetValue(validationContext.ObjectInstance);
            if (property.PropertyType == typeof(string)) {
                if (!AllowEmptyStrings && string.IsNullOrWhiteSpace((string)propertyValue) ) {
                    propertyValue = null;
                }
            }
            if (Equals(valueToCompare, propertyValue))
            {
                return base.IsValid(value, validationContext);
            }

            return ValidationResult.Success;
        }
    }
}
