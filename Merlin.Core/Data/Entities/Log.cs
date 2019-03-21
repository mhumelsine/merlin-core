using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class Log
    {
        public int Id { get; set; }
        public DateTime DtEvent { get; set; }
        public string CdLevel { get; set; }
        public string CdProcess { get; set; }
        public string IdUser { get; set; }
        public string DsServername { get; set; }
        public string DsMessage { get; set; }
        public string DsSource { get; set; }
        public string DsClassname { get; set; }
        public string DsMethod { get; set; }
        public string DsExceptionType { get; set; }
        public string DsExceptionMessage { get; set; }
        public string DsStacktrace { get; set; }
        public string DsInnerException { get; set; }
    }
}
