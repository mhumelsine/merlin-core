using Dapper;
using Isf.Core.Utils;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.ELRSearch.Commands;
using Merlin.Data.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Merlin.Core.Data;

namespace Merlin.Core.Elr.Services
{
    public class ELRSearchService
    {
        private readonly MerlinWriteContext writeContext;
        private readonly IUsernameProvider usernameProvider;

        public ELRSearchService(MerlinWriteContext writeContext, IUsernameProvider usernameProvider)
        {
            this.writeContext = writeContext;
            this.usernameProvider = usernameProvider;
        }

        public async Task Execute(ReprocessForceAssignment command)
        {
            foreach (var observation in command.ObservationKeys)
            {
                await writeContext.ElrOutcome.AddAsync(new Data.ElrOutcome
                {
                    CdAction = "Send to Task List",
                    CdAssignmentType = command.AssignmentType,
                    DsAssignmentReason = command.AssignmentReason,
                    IdElrObservation = observation,
                    IdProfile = command.ProfileId,
                    IdStateno = command.StateNo,
                    CdCounty=command.County
                });
            }

            await writeContext.SaveChangesAsync();

            await Execute(new RefilterObservations
            {
                ObservationKeys = command.ObservationKeys
            });
        }

        public async Task Execute(ReprocessForceImport command)
        {
            foreach (var observation in command.ObservationKeys)
            {
                await writeContext.ElrOutcome.AddAsync(new Data.ElrOutcome
                {
                    CdAction = DispositionType.AutoImport,
                    IdElrObservation = observation,
                    IdProfile = command.ProfileId,
                    IdStateno = command.StateNo
                });
            }

            await Execute(new RefilterObservations
            {
                ObservationKeys = command.ObservationKeys
            });

            await writeContext.SaveChangesAsync();
        }

        public async Task Execute(RefilterObservations command)
        {
            //delete from XBOX

            var connection = writeContext.Database
                .GetDbConnection()
                .EnsureOpen();

            using (var transaction = connection.BeginTransaction())
            {
                foreach (var observationKey in command.ObservationKeys)
                {
                    string sql = @"Execute [sp_ElrReFilter] @observationKey, @userId";

                    await connection.ExecuteAsync(sql, new { observationKey, userId = usernameProvider.GetUsername() }, transaction);
                }

                transaction.Commit();
            }
        }

        public async Task Execute(DeleteTemplate command)
        {
            var item = writeContext.ElrSearchTemplates.Where(l => l.Id.Equals(command.Id)).FirstOrDefault();

            writeContext.ElrSearchTemplates.Remove(item);

            await writeContext.SaveChangesAsync();
        }

        public async Task Execute(UpdateTemplate command)
        {
            var templateDtls = writeContext.ElrSearchTemplates.Where(l => l.Id.Equals(command.TemplateId)).FirstOrDefault();

                templateDtls.CdType = command.TemplateType;
                templateDtls.DsName = command.TemplateName;
                templateDtls.JsData = JsonConvert.SerializeObject(command.Criteria);

            await writeContext.SaveChangesAsync();
        }

        public async Task<int> Execute(CreateTemplate command)
        {
            ElrSearchTemplates template = new ElrSearchTemplates
            {
                CdType = command.TemplateType,
                DsName = command.TemplateName,
                JsData = JsonConvert.SerializeObject(command.Criteria),
            };

            await writeContext.ElrSearchTemplates.AddAsync(template);

            await writeContext.SaveChangesAsync();

            return template.Id;
        }

    }
}
