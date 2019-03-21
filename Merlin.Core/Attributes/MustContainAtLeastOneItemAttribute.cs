using Microsoft.EntityFrameworkCore.Internal;
using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace Merlin.Core
{
    public class MustContainAtLeastOneItemAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value is IEnumerable)
            {
                if (((IEnumerable)value).Any())
                {
                    return true;
                }
            }

            return false;
        }
    }
}
