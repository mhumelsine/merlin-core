namespace Merlin.Core.Data
{
    public partial class SurveyObjectMapping
    {
        public string IdQuestion { get; set; }
        public string CdMappingtype { get; set; }
        public string NmMapvalue { get; set; }

        public string TableName => NmMapvalue.Split('.')[0];

        public string ColumnName => NmMapvalue.Split('.')[1];
    }
}
