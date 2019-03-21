using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Utils
{
    public static class HashHelpers
    {
        public static int GetHashCode(params object[] attributes)
        {
            unchecked
            {
                int hash = 13;
                const int salt = 31;

                for(int i = 0; i < attributes.Length; i++)
                {
                    if (attributes[i] != null)
                    {
                        hash = hash * salt + attributes[i].GetHashCode();
                    }
                }

                return hash;
            }
        }
    }
}
