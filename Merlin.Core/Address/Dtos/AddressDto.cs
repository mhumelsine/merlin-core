using Merlin.Core.Utils;

namespace Merlin.Core.Address.Dtos
{
    public class AddressDto
    {
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string Zip { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string County { get; set; }
        public string Country { get; set; }

        public override int GetHashCode()
        {
            return HashHelpers.GetHashCode(
                AddressLine1,
                AddressLine2,
                Zip,
                City,
                State,
                Country,
                County);
        }

        public override bool Equals(object obj)
        {
            var other = obj as AddressDto;

            if(other == null)
            {
                return false;
            }

            return AddressLine1 == other.AddressLine1
                && AddressLine2 == other.AddressLine2
                && Zip == other.Zip
                && City == other.City
                && State == other.State
                && Country == other.Country
                && County == other.County;
        }
    }
}
