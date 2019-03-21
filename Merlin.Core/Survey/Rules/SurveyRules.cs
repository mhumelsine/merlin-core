using Isf.BusinessRules;
using Merlin.Core.Data.DataContexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Survey.Rules
{
    public class SurveyRules : AsyncDynamicBusinessRuleBuilder
    {
        private readonly MerlinReadContext readContext;

        public SurveyRules(MerlinReadContext readContext)
        {
            this.readContext = readContext;
        }
        public SurveyRules MustBeValidLayoutId()
        {
            Rule(async command =>
            {
                Guid layoutId = command.LayoutId;

                bool layoutExists = await readContext.SurveyLayout
                    .AnyAsync(layout => layout.UID == layoutId);

                if(!layoutExists)
                {
                    Error($"Layout with UID '{layoutId}' does found", "LayoutId");
                }
            });

            return this;
        }
    }
}
