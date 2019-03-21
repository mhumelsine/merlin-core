using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Isf.Core.Utils;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Merlin.Core.Data.DataContexts
{
    public partial class ELRWriteContext : DbContext
    {
        public ELRWriteContext()
        {
        }
     
        public ELRWriteContext(DbContextOptions<ELRWriteContext> options)
            : base(options)
        {           
        }
        
        public virtual DbSet<ElrObservation> ElrObservation { get; set; }
        public virtual DbSet<ElrOrder> ElrOrder { get; set; }
        public virtual DbSet<ElrRequest> ElrRequest { get; set; }
        public virtual DbSet<ElrNote> ElrNote { get; set; }

        //        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //        {
        //            if (!optionsBuilder.IsConfigured)
        //            {
        //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
        //                optionsBuilder.UseSqlServer("Server=doh-wddb005;Database=ELR;Trusted_Connection=True;");
        //            }
        //        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ElrObservation>(entity =>
            {
                entity.HasKey(e => e.ObservationKey);

                entity.ToTable("elrObservation", "dbo");

                entity.HasIndex(e => e.AlternateResultCode)
                    .HasName("IX_elrObservation_1");

                entity.HasIndex(e => e.CdAmrIsolate)
                    .HasName("idx_Obx_CD_AMR_ISOLATE");

                entity.HasIndex(e => e.IdMerlinFamily)
                    .HasName("IDX_ID_MERLIN_FAMILY");

                entity.HasIndex(e => e.IdMerlinLrv)
                    .HasName("IDX_elrObservation_MERLIN_LRV");

                entity.HasIndex(e => e.InsertedDateTime)
                    .HasName("idx_ElrObservation_InsertDate");

                entity.HasIndex(e => e.ObservationAlternateCode)
                    .HasName("ix_ob_alt_code");

                entity.HasIndex(e => e.ObservationDateTime)
                    .HasName("idx_ElrObservation_ObDateTime");

                entity.HasIndex(e => new { e.OrderKey, e.AssignedIcd9code })
                    .HasName("idx_ElrObservation_AssignedICD9Code");

                entity.HasIndex(e => new { e.OrderKey, e.InFluheaderResponsible })
                    .HasName("idx_ElrObservation_IN_FLUHEADER_RESPONSIBLE");

                entity.HasIndex(e => new { e.ObservationKey, e.Doiflag, e.OrderKey })
                    .HasName("idx_ElrObservation_OrderKey");

                entity.HasIndex(e => new { e.ObservationKey, e.Supercedes, e.SupercededBy })
                    .HasName("IX_elrObservation_5");

                entity.HasIndex(e => new { e.ObservationCode, e.ObservationAlternateCode, e.ObservationName, e.ObservationAlternateName })
                    .HasName("IX_elrObservation_3");

                entity.HasIndex(e => new { e.PickupStatus, e.Doiflag, e.HasImportantChanges, e.SupercededBy })
                    .HasName("IX_elrObservation_7");

                entity.HasIndex(e => new { e.PickupStatus, e.Doiflag, e.SupercededBy, e.HasImportantChanges })
                    .HasName("idx_elrObservation");

                entity.HasIndex(e => new { e.ObservationCode, e.ObservationName, e.ObservationType, e.ObservationAlternateCode, e.ObservationAlternateName, e.ObservationAlternateType })
                    .HasName("IX_elrObservation");

                entity.HasIndex(e => new { e.ObservationKey, e.OrderKey, e.AssignedIcd9code, e.ResultNumericComparator, e.ResultNumericNumber1, e.ResultNumericSeparator, e.ResultNumericNumber2, e.Units, e.ProcessedDateTime, e.LastProcessedObservationKey, e.ObservationId, e.Doiflag, e.PickupStatus })
                    .HasName("IX_COVERED_KEYS");

                entity.Property(e => e.AbnormalFlag)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.AlternateResultCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.AlternateResultCodingSystem)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.AlternateResultDescription)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.AssignedIcd9code)
                    .HasColumnName("AssignedICD9Code")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.AssignedMerlinCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CdAmrIsolate)
                    .HasColumnName("CD_AMR_ISOLATE")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CdGrouping)
                    .HasColumnName("CD_GROUPING")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Doiflag)
                    .HasColumnName("DOIFlag")
                    .HasDefaultValueSql("(0)");

                entity.Property(e => e.FilterAssignedMerlinResult)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.HasImportantChanges).HasDefaultValueSql("(1)");

                entity.Property(e => e.IdMerlinEvent).HasColumnName("ID_MERLIN_EVENT");

                entity.Property(e => e.IdMerlinFamily).HasColumnName("ID_MERLIN_FAMILY");

                entity.Property(e => e.IdMerlinLrv).HasColumnName("ID_MERLIN_LRV");

                entity.Property(e => e.InFluheaderResponsible).HasColumnName("IN_FLUHEADER_RESPONSIBLE");

                entity.Property(e => e.InMerlinParent).HasColumnName("IN_MERLIN_PARENT");

                entity.Property(e => e.InsertedDateTime)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("(0)");

                entity.Property(e => e.MerlinResourceId).HasColumnName("MerlinResourceID");

                entity.Property(e => e.Methodology)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Notifyflag)
                    .HasColumnName("notifyflag")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.NucSeq)
                    .HasMaxLength(2500)
                    .IsUnicode(false);

                entity.Property(e => e.ObservationAlternateCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ObservationAlternateName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("(255)");

                entity.Property(e => e.ObservationAlternateType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ObservationCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ObservationDateTime).HasColumnType("datetime");

                entity.Property(e => e.ObservationId)
                    .HasColumnName("ObservationID")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ObservationName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ObservationStatus)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ObservationType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PerformingSiteAddress1)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PerformingSiteAddress2)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PerformingSiteCity)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PerformingSiteCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PerformingSiteCodeType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PerformingSiteCountyCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PerformingSiteCountyName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PerformingSiteName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PerformingSiteState)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PerformingSiteZip)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PickupStatus).HasDefaultValueSql("(1)");

                entity.Property(e => e.ProcessedDateTime).HasColumnType("datetime");

                entity.Property(e => e.ProcessedDisposition)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.RawAbnormalFlag)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RawUnits)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ReferenceComparator)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ReferenceNumber1)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ReferenceNumber2)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ReferencePrefix)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ReferenceRange)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ResultCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ResultCodingSystem)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ResultDescription)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ResultNumericComparator)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ResultNumericNumber1)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ResultNumericNumber2)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ResultNumericSeparator)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ResultNumericSuffix)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ResultType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SubId)
                    .HasColumnName("SubID")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SupercededBy).HasDefaultValueSql("(0)");

                entity.Property(e => e.Supercedes).HasDefaultValueSql("(0)");

                entity.Property(e => e.Units)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedDateTime).HasColumnType("datetime");

                entity.HasOne(d => d.OrderKeyNavigation)
                    .WithMany(p => p.ElrObservation)
                    .HasForeignKey(d => d.OrderKey)
                    .HasConstraintName("FK_elrObservation3");
            });

            modelBuilder.Entity<ElrOrder>(entity =>
            {
                entity.HasKey(e => e.OrderKey);

                entity.ToTable("elrOrder", "dbo");

                entity.HasIndex(e => e.DtLabEvent)
                    .HasName("idx_ElrOrder_LabEventDate");

                entity.HasIndex(e => e.OrderId)
                    .HasName("IX_elrOrder");

                entity.HasIndex(e => e.RequestKey)
                    .HasName("elrOrder15");

                entity.HasIndex(e => e.SpecimenCollectedDateTime)
                    .HasName("idx_ElrOrder_SpecCollDate");

                entity.HasIndex(e => e.SpecimenId)
                    .HasName("IX_COVERED_KEYS_request");

                entity.HasIndex(e => e.SpecimenReceivedDateTime)
                    .HasName("idx_ElrOrder_SpecRecdDate");

                entity.HasIndex(e => new { e.OrderCode, e.OrderAlternateCode })
                    .HasName("IX_elrOrder_1");

                entity.HasIndex(e => new { e.OrderKey, e.RequestKey, e.SpecimenId, e.InsertedDateTime, e.DtLabEvent, e.DsFluHeader })
                    .HasName("idx_ElrObservation_DS_FLU_HEADER");

                entity.HasIndex(e => new { e.OrderKey, e.RequestKey, e.SpecimenId, e.InsertedDateTime, e.SpecimenCollectedDateTime, e.SpecimenReceivedDateTime, e.DtLabEvent, e.DsFluHeader })
                    .HasName("idx_DS_FLUHEADER");

                entity.Property(e => e.AmAge).HasColumnName("AM_AGE");

                entity.Property(e => e.DemographicUpdateFlag)
                    .HasColumnName("Demographic_Update_Flag")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Doiflag)
                    .HasColumnName("DOIFlag")
                    .HasDefaultValueSql("(0)");

                entity.Property(e => e.DsFluHeader)
                    .HasColumnName("DS_FLU_HEADER")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DsRsvHeader)
                    .HasColumnName("DS_RSV_HEADER")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.DtLabEvent)
                    .HasColumnName("DT_LAB_EVENT")
                    .HasColumnType("datetime");

                entity.Property(e => e.FillerNumber)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Hl7specimenTypeCode)
                    .HasColumnName("HL7SpecimenTypeCode")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Hl7specimenTypeName)
                    .HasColumnName("HL7SpecimenTypeName")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.InsertedDateTime)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("(0)");

                entity.Property(e => e.MerlinSpecimenCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderAlternateCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderAlternateDescription)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.OrderAlternateType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderDescription)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.OrderIcd9codes)
                    .HasColumnName("OrderICD9Codes")
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.OrderId)
                    .HasColumnName("OrderID")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderRequestedDateTime).HasColumnType("datetime");

                entity.Property(e => e.OrderStatus)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ParentFillerNum)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ParentOrderId)
                    .HasColumnName("ParentOrderID")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ParentPlacerNum)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ParentResult).HasColumnType("text");

                entity.Property(e => e.PlacerNumber)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.PlacerOrderId)
                    .HasColumnName("PlacerOrderID")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ProgramComponent)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpecimenCollectedDateTime).HasColumnType("datetime");

                entity.Property(e => e.SpecimenId)
                    .IsRequired()
                    .HasColumnName("SpecimenID")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpecimenReceivedDateTime).HasColumnType("datetime");

                entity.Property(e => e.SpecimenTransportId)
                    .HasColumnName("SpecimenTransportID")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpecimenTransportMode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpecimenTypeCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpecimenTypeName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Spmkey).HasColumnName("SPMKey");

                entity.Property(e => e.SterileSource)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.SupercededBy).HasDefaultValueSql("(0)");

                entity.Property(e => e.Supercedes).HasDefaultValueSql("(0)");

                entity.Property(e => e.UpdatedDateTime).HasColumnType("datetime");

                entity.HasOne(d => d.RequestKeyNavigation)
                    .WithMany(p => p.ElrOrder)
                    .HasForeignKey(d => d.RequestKey)
                    .HasConstraintName("FK_elrOrder2");
            });

            modelBuilder.Entity<ElrRequest>(entity =>
            {
                entity.HasKey(e => e.RequestKey);

                entity.ToTable("elrRequest", "dbo");

                entity.HasIndex(e => e.AuditGuid)
                    .HasName("IX_elrRequest_2");

                entity.HasIndex(e => e.PatientCountyCode)
                    .HasName("IX_elrRequest_CountyCode");

                entity.HasIndex(e => e.PatientCountyName)
                    .HasName("idx_elrRequest_CountyCode");

                entity.HasIndex(e => e.PatientSsn)
                    .HasName("IX_elrRequest_3");

                entity.HasIndex(e => e.RequestId)
                    .HasName("IX_elrRequest");

                entity.HasIndex(e => e.SendingApplication)
                    .HasName("IX_elrRequest_1");

                entity.HasIndex(e => new { e.PatientLastName, e.PatientFirstName })
                    .HasName("IX_elrRequest_4");

                entity.HasIndex(e => new { e.RequestKey, e.PatientCountyCode, e.MessageDateTime })
                    .HasName("idx_MessageDateTime");

                entity.HasIndex(e => new { e.PatientCountyCode, e.PatientFirstName, e.PatientMiddleName, e.PatientLastName })
                    .HasName("IX_COVERED_KEYS_elrRequest");

                entity.Property(e => e.Addr1)
                    .HasColumnName("addr1")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Addr2)
                    .HasColumnName("addr2")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Age)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.AmLatitude).HasColumnName("AM_LATITUDE");

                entity.Property(e => e.AmLongitude).HasColumnName("AM_LONGITUDE");

                entity.Property(e => e.AuditGuid).HasColumnName("AuditGUID");

                entity.Property(e => e.CdCounty)
                    .HasColumnName("cd_county")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.City)
                    .HasColumnName("city")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.DsAccumailMsg)
                    .HasColumnName("DS_ACCUMAIL_MSG")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.DsCounty)
                    .HasColumnName("ds_county")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FastingIndicator)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Hl7ethnicity)
                    .HasColumnName("HL7Ethnicity")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Hl7gender)
                    .HasColumnName("HL7Gender")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Hl7race)
                    .HasColumnName("HL7Race")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.InAddressValidated).HasColumnName("IN_ADDRESS_VALIDATED");

                entity.Property(e => e.InsertedDateTime)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.LabPriority)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.MerlinResourceId).HasColumnName("MerlinResourceID");

                entity.Property(e => e.MessageDateTime).HasColumnType("datetime");

                entity.Property(e => e.MessageKey)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OnSetDateofIllness).HasColumnType("datetime");

                entity.Property(e => e.OrderingFacilityAddress1)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingFacilityAddress2)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingFacilityCity)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingFacilityCountyCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingFacilityCountyName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingFacilityId)
                    .HasColumnName("OrderingFacilityID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingFacilityName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingFacilityPhoneAreaCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingFacilityPhoneCountryCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingFacilityPhoneData)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingFacilityPhoneExtension)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingFacilityPhoneNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingFacilitySentinelId)
                    .HasColumnName("OrderingFacilitySentinelID")
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingFacilityState)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingFacilityZip)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderAddress1)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderAddress2)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderCity)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderCountyCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderCountyName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderFirstInitial)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderId)
                    .HasColumnName("OrderingProviderID")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderLastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderPhoneAreaCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderPhoneCountryCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderPhoneData)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderPhoneExtension)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderPhoneNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderSentinelId)
                    .HasColumnName("OrderingProviderSentinelID")
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderState)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderingProviderZip)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Outbreak)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.PatientAddress1)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PatientAddress2)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PatientCity)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PatientCountyCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PatientCountyName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PatientDob)
                    .HasColumnName("PatientDOB")
                    .HasColumnType("datetime");

                entity.Property(e => e.PatientEthnicity)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PatientFirstName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PatientGender)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PatientId)
                    .HasColumnName("PatientID")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PatientLastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PatientMiddleName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PatientPhoneAreaCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PatientPhoneCountryCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PatientPhoneData)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PatientPhoneExtension)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PatientPhoneNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PatientRace)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PatientSsn)
                    .HasColumnName("PatientSSN")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PatientState)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PatientSuffix)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PatientZip)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Phinethnicity)
                    .HasColumnName("PHINEthnicity")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Phingender)
                    .HasColumnName("PHINGender")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Phinrace)
                    .HasColumnName("PHINRace")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PlacerRequestId)
                    .HasColumnName("PlacerRequestID")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Pregnant)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ProgComponent)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ProgSubComp)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RequestId)
                    .IsRequired()
                    .HasColumnName("RequestID")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SendingApplication)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SendingApplicationCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SendingApplicationCodeType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SendingFacilityCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SendingFacilityCodeType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SendingFacilityName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpecialHandle)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.SpecialProject)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.State)
                    .HasColumnName("state")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SupercededBy).HasDefaultValueSql("((0))");

                entity.Property(e => e.Supercedes).HasDefaultValueSql("((0))");

                entity.Property(e => e.Symptoms)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.TravelHistory)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedDateTime).HasColumnType("datetime");

                entity.Property(e => e.Zip)
                    .HasColumnName("zip")
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });
            modelBuilder.Entity<ElrNote>(entity =>
            {
                entity.HasKey(e => e.NoteKey);

                entity.ToTable("elrNote", "dbo");

                entity.Property(e => e.RequestKey)
                    .HasColumnName("RequestKey");

                entity.Property(e => e.OrderKey)
                    .HasColumnName("OrderKey");

                entity.Property(e => e.ObservationKey)
                    .HasColumnName("ObservationKey");

                entity.Property(e => e.NoteSequenceID)
                    .HasColumnName("NoteSequenceID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NoteSource)
                    .HasColumnName("NoteSource")
                    .HasMaxLength(55)
                    .IsUnicode(false);

                entity.Property(e => e.Note)
                    .HasColumnName("Note")
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.NoteType)
                    .HasColumnName("NoteType")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.InsertedDateTime)
                    .HasColumnType("InsertedDateTime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdatedDateTime)
                   .HasColumnType("UpdatedDateTime")
                   .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsDeleted)
                    .HasDefaultValueSql("(0)");

            });
        }
    }
}
