using Isf.BusinessRules;
using Merlin.Core.Codes.Services;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.ELRSearch.Commands;
using Merlin.Core.ELRSearch.Queries;
using Merlin.Core.ELRSearch.Services;
using Merlin.Core.Survey.Dtos;
using Merlin.Core.Survey.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Isf.Core.Utils;
using Merlin.Core.ELRSearch.Dtos;

namespace Merlin.Core.ELRSearch.Rules
{
    public class ELRSearchRules : AsyncDynamicBusinessRuleBuilder
    {
        private readonly ELRSearchRepository repos;
        private readonly MerlinReadContext merlinReadContext;
        private readonly IUsernameProvider usernameProvider;

        public ELRSearchRules(ELRSearchRepository repos, MerlinReadContext merlinReadContext, IUsernameProvider usernameProvider)
        {
            this.repos = repos;
            this.merlinReadContext = merlinReadContext;
            this.usernameProvider = usernameProvider;
        }

        public ELRSearchRules EnsureValidOperator()
        {
            var validOperators = new string[] { "<", ">", "<=", ">=", "<>", "=", "LIKE" };

            Rule(async q =>
            {
                ICollection<SearchCriteria> criteria = q.Criteria;

                var allValidOperators = criteria
                    .All(c => validOperators.Contains(c.Operator));

                if (!allValidOperators)
                {
                    criteria
                        .Where(c => !validOperators.Contains(c.Operator))
                        .Select(c => $"'{c.Operator}' is not a valid operator")
                        .Distinct()
                        .ToList()
                        .ForEach(error => Error(error, string.Empty));
                }
            });

            return this;
        }

        public ELRSearchRules EnsureValidColumnName()
        {
            Rule(async q =>
            {
                ICollection<SearchCriteria> criteria = q.Criteria;

                var validColumns = (await repos.GetElrColumns())
                    .Select(info => info.FQColumnName)
                    .ToList();

                var allValidColumns = criteria
                    .All(c => validColumns.Contains(c.FQColumnName));

                if (!allValidColumns)
                {
                    criteria
                        .Where(c => !validColumns.Contains(c.FQColumnName))
                        .Select(c => $"'{c.FQColumnName}' is not a valid Column Name")
                        .Distinct()
                        .ToList()
                        .ForEach(error => Error(error, string.Empty));
                }
            });

            return this;
        }

        public ELRSearchRules MustNotHaveExistingPendingOutcome()
        {
            Rule(async command =>
            {
                List<int> keys = command.ObservationKeys;
                var outcomes = await merlinReadContext.ElrOutcome.AnyAsync(a => keys.Contains(a.IdElrObservation));

                //TODO SEP - We need to edit the Library to allow Error to take multiple params for property name.
                if (outcomes || keys.Count == 0)
                {
                    Error("There is a pending outcome for one or more of the selected Observations.", string.Empty);
                }
            });

            return this;
        }
        public ELRSearchRules EnsureValidProfileId()
        {
            Rule(async command =>
            {
                int? profileId = command.ProfileId;

                if (profileId != null)
                {
                    var validProfile = await merlinReadContext.EpiProfile.AnyAsync(a => a.IdProfile == profileId);

                    if (!validProfile)
                    {
                        Error($"{profileId} is not a valid Profile Id.", "ProfileId");
                    }
                }
            });

            return this;
        }

        public ELRSearchRules MaxPageSize1000()
        {
            Rule(async query =>
            {
                if (query.PageSize > 1000)
                {
                    Error($"Maximum Page Size is 1000.  Page Size '{query.PageSize}' is too large.", "PageSize");
                }

            });

            return this;
        }

        public ELRSearchRules NoDuplicateTemplateNames()
        {
            Rule(async q =>
            {
                string name = q.TemplateName;
                int id = q.TemplateId;

                bool nameExists = await merlinReadContext.ElrSearchTemplates
                    .AnyAsync(template => template.DsName == name &&
                    (template.IdAdded == usernameProvider.GetUsername() || template.CdType == "MASTER"));

                bool exists = await merlinReadContext.ElrSearchTemplates
                                .Where(e => e.Id.Equals(id))
                                .Select(e => e.DsName == name).FirstOrDefaultAsync();


                if (nameExists && !exists)
                {
                    Error($"A Template with the name '{name}' already exists.", "templateName");
                }
            });

            return this;
        }
    }
}
