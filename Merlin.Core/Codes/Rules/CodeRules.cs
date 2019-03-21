using Isf.BusinessRules;
using Merlin.Core.Data.DataContexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Merlin.Core.Codes.Rules
{
    public class CodeRules : AsyncDynamicBusinessRuleBuilder
    {
        private readonly MerlinReadContext readContext;

        public CodeRules(MerlinReadContext readContext)
        {
            this.readContext = readContext;
        }
        public CodeRules CodeTypeMustExist()
        {
            Rule(async model =>
            {
                string codeType = model.CodeType;

                var codeExists = await readContext.Codes
                    .AnyAsync(code => code.CdType == codeType);

                if(codeExists)
                {
                    Error($"Code Type '{codeType}' was not found", "CodeType");
                }
                
            });

            return this;
        }
    }
}
