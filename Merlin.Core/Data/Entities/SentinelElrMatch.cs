using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class SentinelElrMatch
    {
        public int IdSpecimen { get; set; }
        public string DsAccession { get; set; }
        public string IdAttached { get; set; }
        public DateTime DtAttached { get; set; }
        public DateTime? DtObservation { get; set; }
        public DateTime? DtCulture { get; set; }
        public DateTime? DtPcr { get; set; }
        public string CdPcrAunk { get; set; }
        public string CdPcrAh1 { get; set; }
        public string CdPcrA09h1 { get; set; }
        public string CdPcrAh3 { get; set; }
        public string CdPcrAunsubtypable { get; set; }
        public string CdPcrB { get; set; }
        public string CdPcrRsv { get; set; }
        public string CdPcrPiv1 { get; set; }
        public string CdPcrPiv2 { get; set; }
        public string CdPcrPiv3 { get; set; }
        public string CdPcrPiv4 { get; set; }
        public string CdPcrMpv { get; set; }
        public string CdPcrRhino { get; set; }
        public string CdPcrAdeno { get; set; }
        public string CdPcrEntero { get; set; }
        public string CdPcrBoca { get; set; }
        public string CdPcrUnableToTest { get; set; }
        public string CdCultureAunk { get; set; }
        public string CdCultureAh1 { get; set; }
        public string CdCultureAnovelH1 { get; set; }
        public string CdCultureAh3 { get; set; }
        public string CdCultureAunsubtypable { get; set; }
        public string CdCultureRsv { get; set; }
        public string CdCulturePiv1 { get; set; }
        public string CdCulturePiv2 { get; set; }
        public string CdCulturePiv3 { get; set; }
        public string CdCulturePiv4 { get; set; }
        public string CdCultureMpv { get; set; }
        public string CdCultureRhino { get; set; }
        public string CdCultureAdeno { get; set; }
        public string CdCultureEntero { get; set; }
        public string CdCultureBoca { get; set; }
        public string CdCultureB { get; set; }
        public string CdCultureOtherVirus { get; set; }
    }
}
