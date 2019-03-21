using Isf.BusinessRules;
using Merlin.Core.Data;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Survey.Rules
{
    public class QuestionRules : AsyncDynamicBusinessRuleBuilder
    {
        private readonly MerlinReadContext readContext;

        public QuestionRules(MerlinReadContext readContext)
        {
            this.readContext = readContext;
        }

        public QuestionRules NoDuplicateQuestionText()
        {
            Rule(async model =>
            {
                string questionText = model.QuestionText;

                var question = await readContext.SurveyQuestionBank
                    .FirstOrDefaultAsync(q => q.InBankQuestion && q.DsQuestion == questionText);

                if(question != null)
                {
                    Error($"Question with id '{question.IdQuestion}' already exists with the same question text", "QuestionText");
                }
            });

            return this;
        }    
        
        public QuestionRules QuestionMustNotBeAnswered()
        {
            Rule(async command =>
            {
                var question = await readContext.SurveyQuestionBank.FindAsync(command.QuestionId);

                if(question == null)
                {
                    throw new EntityNotFoundException(typeof(SurveyQuestionBank), command.QuestionId);
                }

                if(question.InAnswered)
                {
                    Error($"Question with ID '{question.QuestionId}' cannot be edited because it has been answered.", string.Empty);
                }
            });

            return this;            
        }
    }
}
