using Merlin.Core.Data;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Exceptions;
using Merlin.Core.Survey.Commands;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    public class ObjectMappingService
    {
        private readonly MerlinWriteContext writeContext;

        public ObjectMappingService(MerlinWriteContext writeContext)
        {
            this.writeContext = writeContext;
        }
        public async Task Execute(CreateObjectMapping command)
        {
            //create the survey object mapping object (purpose of the command)
            var mapping = new SurveyObjectMapping
            {
                IdQuestion = command.QuestionId,
                CdMappingtype = command.MappingType,
                NmMapvalue = command.MappingValue
            };

            await writeContext.SurveyObjectMapping.AddAsync(mapping);
            await writeContext.SaveChangesAsync();
        }

        public async Task Execute(UpdateObjectMapping command)
        {
            var mapping = await writeContext.SurveyObjectMapping.FindAsync(command.QuestionId, command.MappingType);

            if (mapping == null)
            {
                throw new EntityNotFoundException(typeof(SurveyObjectMapping), new { command.QuestionId, command.MappingType });
            }

            mapping.IdQuestion = command.QuestionId;
            mapping.CdMappingtype = command.MappingType;
            mapping.NmMapvalue = command.MappingValue;
            
            await writeContext.SaveChangesAsync();
        }

        public async Task Execute(DeleteObjectMapping command)
        {           
            var mapping = await writeContext.SurveyObjectMapping.FindAsync(command.QuestionId, command.MappingType);

            if (mapping == null)
            {
                throw new EntityNotFoundException(typeof(SurveyObjectMapping), new { command.QuestionId, command.MappingType });
            }

            writeContext.SurveyObjectMapping.Remove(mapping);

            await writeContext.SaveChangesAsync();
        }
    }
}
