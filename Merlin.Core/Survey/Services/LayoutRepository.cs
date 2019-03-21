using Isf.Core.Cqrs;
using Merlin.Core.Codes.Services;
using Merlin.Core.Data;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Exceptions;
using Merlin.Core.Survey.Dtos;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    public class LayoutRepository
    {
        private readonly MerlinReadContext readContext;
        private readonly CodeRepository codeRepos;

        public LayoutRepository(MerlinReadContext readContext, CodeRepository codeRepos)
        {
            this.readContext = readContext;
            this.codeRepos = codeRepos;
        }

        public async Task<LayoutDto> GetLayoutById(Guid? LayoutId)
        {
            if(LayoutId == null) throw new AggregateRootNotFoundException<LayoutDto>(LayoutId);

            var layout = await readContext.SurveyLayout
                  .Include(l => l.SurveyLayoutTag)
                  .Include(l => l.SurveyLayoutQuestion)
                  .AsNoTracking()
                  .FirstOrDefaultAsync(l => l.UID == LayoutId);

            var surveys = await readContext.Survey
                .Where(survey => survey.UidLayout == LayoutId)
                .Select(survey => new SurveyListDto
                {
                    SurveyName = survey.NmSurvey,
                    EffectiveDate = survey.DtEffective,
                    Icd9 = survey.CdIcd9,
                    OutbreakId = survey.IdOutbreak
                })
                .ToListAsync();

            if (layout == null)
            {
                throw new AggregateRootNotFoundException<SurveyLayout>(LayoutId);
            }

            var items = layout.JsLayout != null ? JsonConvert.DeserializeObject<List<LayoutItemDto>>(layout.JsLayout) : new List<LayoutItemDto>();

            var questions = await readContext.SurveyQuestionBank
                .Where(q => layout.SurveyLayoutQuestion.Any(lq => lq.IdQuestion == q.IdQuestion))
                .ToListAsync();

            await LoadCurrentQuestionInfo(items, questions);

            var dto = new LayoutDto
            {
                LayoutId = layout.UID,
                LayoutName = layout.NmLayout,
                Tags = layout.SurveyLayoutTag
                    .Select(x => x.DsTag)
                    .ToList(),
                Items = items,
                Surveys = surveys,
                SavedOn = layout.DtChanged ?? layout.DtAdded
            };

            return dto;

        }

        #region Private Methods
        private async Task LoadCurrentQuestionInfo(IEnumerable<LayoutItemDto> items, IEnumerable<SurveyQuestionBank> questions)
        {
            foreach (var item in items)
            {
                if (item.Type == LayoutItemType.Question)
                {
                    var question = questions.FirstOrDefault(q => q.IdQuestion == item.Id);

                    if (question == null)
                    {
                        throw new EntityNotFoundException(typeof(SurveyQuestionBank), item.Id);
                    }

                    item.Text = question.DsQuestion;
                    item.QuestionType = question.CdQuestionType;

                    if (!string.IsNullOrWhiteSpace(question.CdCodeType))
                    {
                        item.Choices = await codeRepos.GetCodes(question.CdCodeType);
                    }                    
                }

                await LoadCurrentQuestionInfo(item.Items, questions);
            }
        }

        #endregion
    }
}
