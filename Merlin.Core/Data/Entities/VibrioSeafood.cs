using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class VibrioSeafood
    {
        public int IdSeafood { get; set; }
        public int IdCase { get; set; }
        public string CdSeafood { get; set; }
        public DateTime? DtConsumed { get; set; }
        public string AmConsumedTime { get; set; }
        public string AmConsumed { get; set; }
        public string DsConsumed { get; set; }
        public string CdPrepared { get; set; }
        public string DsPreparedOther { get; set; }
        public string InImported { get; set; }
        public string DsExportingCountry { get; set; }
        public string InHarvested { get; set; }
        public string CdObtained { get; set; }
        public string DsObtainedOther { get; set; }
        public string NmRestaurant { get; set; }
        public string DsRestaurantTelephone { get; set; }
        public string DsRestaurantAddress { get; set; }
        public string CdDistributed { get; set; }
        public string DsDistributedOther { get; set; }
        public DateTime? DtReceived { get; set; }
        public string InRestaurantInvestigated { get; set; }
        public string InShippingTags { get; set; }
        public string DsShippersHandled { get; set; }
        public string DsSource { get; set; }
        public string DsHarvestSite1 { get; set; }
        public DateTime? DtHarvest1 { get; set; }
        public string CdHarvestStatus1 { get; set; }
        public string DsHarvestStatusOther1 { get; set; }
        public string DsHarvestSite2 { get; set; }
        public DateTime? DtHarvest2 { get; set; }
        public string CdHarvestStatus2 { get; set; }
        public string DsHarvestStatusOther2 { get; set; }
        public int? AmAmbientTemp { get; set; }
        public string CdAmbientTempGrade { get; set; }
        public DateTime? DtAmbientTemp { get; set; }
        public string DsAmbientTemp { get; set; }
        public int? AmSurfaceWaterTemp { get; set; }
        public string CdSurfaceWaterTempGrade { get; set; }
        public DateTime? DtSurfaceWaterTemp { get; set; }
        public string DsSurfaceWaterTemp { get; set; }
        public int? AmSalinity { get; set; }
        public DateTime? DtSalinity { get; set; }
        public string DsSalinity { get; set; }
        public int? AmRainfall { get; set; }
        public DateTime? DtRainfall { get; set; }
        public string DsRainfall { get; set; }
        public int? AmFecalColiform { get; set; }
        public DateTime? DtFecalColiform { get; set; }
        public string DsFecalColiform { get; set; }
        public string InImproperStorage { get; set; }
        public string DsImproperStorage { get; set; }
        public string IdAdded { get; set; }
        public DateTime? DtAdded { get; set; }
        public string IdChanged { get; set; }
        public DateTime? DtChanged { get; set; }
        public string NmSeafood { get; set; }
    }
}
