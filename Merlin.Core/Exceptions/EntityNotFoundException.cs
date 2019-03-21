using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Exceptions
{
    public class EntityNotFoundException : Exception
    {
        public EntityNotFoundException(Type entityType, object key)
            :base($"No '{entityType.Name}' with the key '{key}' was found")
        {

        }
    }
}
