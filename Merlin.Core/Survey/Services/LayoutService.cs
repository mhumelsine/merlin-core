using Merlin.Core.Data;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Exceptions;
using Merlin.Core.Survey.Commands;
using Merlin.Core.Survey.Dtos;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    public class LayoutService
    {
        private readonly MerlinWriteContext writeContext;

        public LayoutService(MerlinWriteContext writeContext)
        {
            this.writeContext = writeContext;
        }

        public async Task<Guid> Execute(CreateLayout command)
        {
            var layout = new SurveyLayout
            {
                UID = Guid.NewGuid(),
                NmLayout = command.LayoutName
            };

            layout.SurveyLayoutTag = CreateTags(layout.UID, command.Tags)
                .ToList();

            await writeContext.SurveyLayout.AddAsync(layout);
            await writeContext.SaveChangesAsync();

            return layout.UID;
        }

        //TODO:  This should be a delete in sql or add cascade delete
        public async Task Execute(DeleteLayout command)
        {
            var item = writeContext.SurveyLayout.Where(l => l.UID.Equals(command)).FirstOrDefault();
            // remove tags associated
            writeContext.SurveyLayoutTag.RemoveRange(writeContext.SurveyLayoutTag.Where(l => l.UidLayout.Equals(item.UID)));

            //remove associated questions
            writeContext.SurveyLayoutQuestion.RemoveRange(writeContext.SurveyLayoutQuestion.Where(l => l.UidLayout.Equals(item.UID)));

            // remove layout
            writeContext.SurveyLayout.Remove(item);

            await writeContext.SaveChangesAsync();
        }

        public async Task Execute(UpdateLayout command)
        {
            var layout = await writeContext.SurveyLayout
                .Include(l => l.SurveyLayoutQuestion)
                .Include(l => l.SurveyLayoutTag)
                .FirstOrDefaultAsync(l => l.UID == command.LayoutId);

            if (layout == null)
            {
                throw new EntityNotFoundException(typeof(SurveyLayout), command.LayoutId);
            }

            var currentTags = CreateTags(layout.UID, command.Tags);

            //delete
            layout.SurveyLayoutTag
                .Where(tag => !currentTags.Any(t => tag.DsTag == t.DsTag))
                .ToList()
                .ForEach(tag => layout.SurveyLayoutTag.Remove(tag));

            //add
            currentTags
                .Where(tag => !layout.SurveyLayoutTag.Any(t => t.DsTag == tag.DsTag))
                .ToList()
                .ForEach(tag => layout.SurveyLayoutTag.Add(tag));


            var currentQuestions = GetAllQuestions(layout.UID, command.Items);

            //delete
            layout.SurveyLayoutQuestion
                .Where(question => !currentQuestions.Any(q => q.IdQuestion == question.IdQuestion))
                .ToList()
                .ForEach(question => layout.SurveyLayoutQuestion.Remove(question));

            //add
            currentQuestions
                .Where(question => !layout.SurveyLayoutQuestion.Any(q => q.IdQuestion == question.IdQuestion))
                .ToList()
                .ForEach(question => layout.SurveyLayoutQuestion.Add(question));

            //blank out the question text and choices before serializing the questions
            command.Items
                .GetAll(LayoutItemType.Question)
                .ToList()
                .ForEach(question =>
                {
                    question.Text = string.Empty;
                    question.Choices = null;
                });

            layout.JsLayout = JsonConvert.SerializeObject(command.Items);
            layout.NmLayout = command.LayoutName;

            await writeContext.SaveChangesAsync();
        }

        private IEnumerable<SurveyLayoutTag> CreateTags(Guid layoutId, IEnumerable<string> tags)
        {
            return tags.Select(tag => new SurveyLayoutTag
            {
                UidLayout = layoutId,
                DsTag = tag
            });
        }

        private IEnumerable<SurveyLayoutQuestion> GetAllQuestions(Guid layoutId, IEnumerable<LayoutItemDto> items)
        {
            foreach (var item in items.GetAll("question","repeatingQuestionsGroup"))
            {
                if(item.Type == "repeatingQuestionsGroup")
                {
                    foreach(var subItem in item.Items)
                    {
                        yield return new SurveyLayoutQuestion
                        {
                            UidLayout = layoutId,
                            IdQuestion = subItem.Id
                        };
                    }

                }
                yield return new SurveyLayoutQuestion
                {
                    UidLayout = layoutId,
                    IdQuestion = item.Id
                };
            }
        }


    }
}
