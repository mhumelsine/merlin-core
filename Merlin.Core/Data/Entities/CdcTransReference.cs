using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CdcTransReference
    {
        public int IdKey { get; set; }
        public string CdIcd9 { get; set; }
        public int? DsCdcOrder { get; set; }
        public string DsCdcFieldName { get; set; }
        public string DsCdcFieldType { get; set; }
        public string DsCdcFormat { get; set; }
        public short? DsCdcLength { get; set; }
        public string CdHl7DataType { get; set; }
        public string CdHl7DataElementCodeSystem { get; set; }
        public string CdHl7DataElement { get; set; }
        public string DsHl7DataElement { get; set; }
        public string DsHl7Segment { get; set; }
        public string DsSourceTable { get; set; }
        public string DsSourceField { get; set; }
        public string DsTargetField { get; set; }
        public string DsTargetValue { get; set; }
        public string DsJoinTable { get; set; }
        public string DsJoinKey { get; set; }
        public string CdConvertedValue { get; set; }
        public string DsUnits { get; set; }
        public string IdAdded { get; set; }
        public DateTime DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
    }
}
