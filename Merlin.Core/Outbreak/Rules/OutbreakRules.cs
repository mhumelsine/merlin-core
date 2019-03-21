using Isf.BusinessRules;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Outbreak.Commands;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Outbreak.Rules
{
    public class OutbreakRules : AsyncDynamicBusinessRuleBuilder {
        private readonly MerlinReadContext readContext;

        public OutbreakRules(MerlinReadContext readContext) {
            this.readContext = readContext;
        }

        public OutbreakRules EpiComUserIdMustBeInt()
        {
            Rule(command => {

                if(!int.TryParse(command.EpiComUserId, out int epiComUserId))
                {
                    Error($"EpiCom UserId '{command.EpiComUserId}' should be a number", string.Empty);
                }

                return Task.CompletedTask;
            });
            return this;
        }


        public OutbreakRules RequireModeOfTransmission() {
            Rule(command => {

                if (command.NeedsSubmitCheck && command.ConfirmedOutbreak)
                {
                    if (string.IsNullOrWhiteSpace(command.TransmissionMode))
                    {
                        Error($"Primary Mode of Transmission is required.", nameof(command.TransmissionMode));
                    }
                }

                return Task.CompletedTask;
            });
            return this;
        }

        public OutbreakRules RequireHumanSpecimenConfirmation() {
            Rule(command => {

                if (command.NeedsSubmitCheck && command.ConfirmedOutbreak)
                {
                    if(string.IsNullOrWhiteSpace(command.IsHumanSpecimens))
                    {
                        Error("Laboratory Confirmed Human Specimens is required", nameof(command.IsHumanSpecimens));
                    }
                }

                return Task.CompletedTask;
            });
            return this;
        }



        public OutbreakRules RequireDocumentsWhenAfterActionReportCompleted()
        {
            Rule(async command =>
            {
                int outbreakId = command.OutbreakId;

                if (command.NeedsSubmitCheck && command.IsReportCompleted == "YES")
                {
                    bool hasReport = await readContext.OutbreakDocument
                        .AnyAsync(document => document.CdEpiDocumentType == "AAR");

                    if (!hasReport)
                    {
                        Error($"When After Action Report is marked as completed, a report must be attached.", string.Empty);
                    }
                }
            });
            return this;
        }



        public OutbreakRules RequireSettingInformation() {
            Rule(async command => {

                int outbreakId = command.OutbreakId;

                bool hasSettings = await readContext.OutbreakSettings
                    .AnyAsync(setting => setting.IdOutbreak == outbreakId);

                if (!hasSettings) {
                    Error($"At least one Setting Type must be provided.", string.Empty);
                }

            });
            return this;
        }

       

        public OutbreakRules RequireSettingNameOrFacilityId() {
            Rule(command => {

                if(string.IsNullOrWhiteSpace(command.SettingName) && command.SettingFacilityId == null)
                {
                    Error($"Setting Name is required.", nameof(command.SettingName));
                    Error($"Setting Facility is mandatory.", nameof(command.SettingFacilityId));
                }

                return Task.CompletedTask;
            });

            return this;
        }


        public OutbreakRules NoDuplicateNotes()
        {
            Rule(async command =>
            {
                int outbreakId = command.OutbreakId;
                string noteType = command.NoteType;
                string note = command.Note;

                bool noteExists = await readContext.OutbreakEvents
                    .AnyAsync(e => e.IdOutbreak == outbreakId
                        && e.CdEventType == noteType
                        && e.DsDesc == note);

                if (noteExists)
                {
                    Error("This note already exists and cannot be added again", "Note");
                }
            });

            return this;
        }

    }
}
