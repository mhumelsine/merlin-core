using Merlin.Core.Address;
using Merlin.Core.Address.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Outbreak
{
    public class OutbreakSettingInformationDTO
    {
        public int Id { get; set; }
        public string SettingName { get; set; } // NM_FACILITY
        public bool IsPrimary { get; set; } 	// IN_PRIMARY
        public string SettingType { get; set; } // DS_SETTING
        public string OtherType { get; set; }   // DS_SETTING_OTHER
        public AddressDto Address { get; set; }
        public string SettingContactPhone { get; set; } // DS_CONTACT_PHN
        public string SettingContact { get; set; }  // NM_CONTACT
        public int? SettingFacilityId { get; set; }
        public int OutbreakId { get; set; }
    }
}
