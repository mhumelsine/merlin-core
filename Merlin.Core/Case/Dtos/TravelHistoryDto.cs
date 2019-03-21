
using Merlin.Core.Address;
using Merlin.Core.Address.Dtos;
using Merlin.Core.Utils;

namespace Merlin.Core.Case
{
    public class TravelHistoryDto : IHaveUniqueKey
    {
        public int TravelId { get; set; }
        public AddressDto Address { get; set; }
        public string LocationExposed { get; set; }
        public string LocationName { get; set; }
        public string BeginDate { get; set; }
        public string EndDate { get; set; }
        public string Notes { get; set; }

        public string UniqueKey => $"{TravelId}";

        public override int GetHashCode()
        {
            return HashHelpers.GetHashCode(
                Address,
                BeginDate,
                EndDate);
        }

        public override bool Equals(object obj)
        {
            var other = obj as TravelHistoryDto;

            if (obj == null)
            {
                return false;
            }

            return Equals(Address, other.Address)
                && BeginDate == other.BeginDate
                && EndDate == other.EndDate;
        }
    }
}
