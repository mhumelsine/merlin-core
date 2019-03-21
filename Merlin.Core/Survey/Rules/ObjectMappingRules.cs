using Isf.BusinessRules;
using Merlin.Core.Data;
using Merlin.Core.Data.DataContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Rules
{
    public class ObjectMappingRules : AsyncDynamicBusinessRuleBuilder
    {
        private readonly MerlinReadContext readContext;

        public ObjectMappingRules(MerlinReadContext readContext)
        {
            this.readContext = readContext;
        }
        public ObjectMappingRules NoDuplicateMapping()
        {
            Rule(command =>
            {
                string questionId = command.QuestionId;
                string mappingType = command.MappingType;

                bool mappingExists = readContext.SurveyObjectMapping
                    .Any(mapping => mapping.IdQuestion == questionId
                        && mapping.CdMappingtype == mappingType);

                if(mappingExists)
                {
                    Error($"Question Id '{questionId}' already has a '{mappingType}'  mapping", string.Empty);
                }

                return Task.CompletedTask;
            });

            return this;
        }


    }
}
