using Isf.BusinessRules;
using Merlin.Core.Data.DataContexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Merlin.Core.Survey.Rules
{
    public class LayoutRules : AsyncDynamicBusinessRuleBuilder
    {
        private readonly MerlinReadContext readContext;

        public LayoutRules(MerlinReadContext readContext)
        {
            this.readContext = readContext;
        }
        public LayoutRules NoDuplicateLayoutName()
        {
            Rule(async command =>
            {
                string name = command.LayoutName;

                bool nameExists = await readContext.SurveyLayout
                    .AnyAsync(layout => layout.NmLayout == name);

                if(nameExists)
                {
                    Error($"A Layout with the name '{name}' already exists.  Please pick another name", "LayoutName");
                }
            });

            return this;
        }

        public LayoutRules LayoutCannotBeInUse()
        {
            Rule(async command =>
            {
                Guid uid = command.LayoutUid;

                bool inUse = await readContext.Survey
                    .AnyAsync(l => l.UidLayout == uid);

                if (inUse)
                {
                    Error($"Layout is in use and cannot be deleted", string.Empty);
                }
            });

            return this;
        }
    }
}
