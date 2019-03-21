using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Utils
{
    public interface IHaveUniqueKey
    {
        string UniqueKey { get; }
    }

    public class IHaveUniqueKeyComparer : IEqualityComparer<IHaveUniqueKey>
    {
        public bool Equals(IHaveUniqueKey x, IHaveUniqueKey y)
        {
            return x.UniqueKey == y.UniqueKey;
        }

        public int GetHashCode(IHaveUniqueKey obj)
        {
            return obj.UniqueKey.GetHashCode();
        }
    }
}
