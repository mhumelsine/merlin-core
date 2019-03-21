using Merlin.Core.Data.DataContexts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Merlin.Core.Data.Services;
using System.Linq;
using Merlin.Core.Data;
using Microsoft.EntityFrameworkCore;
using Merlin.Core.Outbreak.Commands;
using Merlin.Core.Exceptions;
using Merlin.Core.Codes.Services;
using Isf.Core.Utils;
using System.Net.Http;
using Merlin.Core.Survey.Services;
using Merlin.Core.Survey.Commands;
using Dapper;
using Microsoft.EntityFrameworkCore.Storage;
using Merlin.Data.Services;

namespace Merlin.Core.Outbreak.Services
{
    public class OutbreakService
    {
        private readonly MerlinWriteContext writeContext;
        private readonly ISequenceGenerator sequenceGenerator;
        private readonly OutbreakRepository outbreakEventsRepository;
        private readonly CodeRepository codeRepository;
        private readonly IUsernameProvider usernameProvider;
        private readonly SurveyService surveyService;
        private readonly EmailService emailService;

        public OutbreakService(MerlinWriteContext writeContext,
            ISequenceGenerator sequenceGenerator,
            OutbreakRepository outbreakEventsRepository,
            CodeRepository codeRepository,
            IUsernameProvider usernameProvider,
            SurveyService surveyService,
            EmailService emailService)
        {
            this.writeContext = writeContext;
            this.sequenceGenerator = sequenceGenerator;
            this.outbreakEventsRepository = outbreakEventsRepository;
            this.codeRepository = codeRepository;
            this.usernameProvider = usernameProvider;
            this.surveyService = surveyService;
            this.emailService = emailService;
        }

        private void ReplaceSymptoms(
            Data.Outbreak outbreak,
            IEnumerable<string> symptoms,
            string otherSymptom)
        {
            outbreak.OutbreakSymptoms.Clear();

            var symptomsToAdd = symptoms
                .Select(symptom => new OutbreakSymptoms
                {
                    CdSymptoms = symptom,
                    IdOutbreak = outbreak.IdOutbreak
                });

            foreach (var symptom in symptomsToAdd)
            {
                if (symptom.CdSymptoms == SymptomType.Other)
                {
                    symptom.DsOther = otherSymptom;
                }

                outbreak.OutbreakSymptoms.Add(symptom);
            }
        }

        private async Task ReplaceEvents(
            Data.Outbreak outbreak,
            string outbreakEventType,
            IEnumerable<string> eventData,
            DateTime eventDate,
            params string[] codeType
            )
        {
            outbreak.OutbreakEvents
                .Where(e => e.CdEventType == outbreakEventType)
                .ToList()
                .ForEach(e => writeContext.OutbreakEvents.Remove(e));

            if (eventData == null)
            {
                return;
            }

            var tasks = eventData
                .Select(async e => new OutbreakEvents
                {
                    IdOutbreak = outbreak.IdOutbreak,
                    CdEventType = outbreakEventType,
                    CdSubType = e,
                    DsDesc = await codeRepository.GetDescription(e, codeType),
                    DtEvent = eventDate,
                    IdEvent = (int)await sequenceGenerator.GetNextAsync(SequenceType.OutbreakEventId),
                })
                .ToArray();

            await Task.WhenAll(tasks);

            foreach (var task in tasks)
            {
                outbreak.OutbreakEvents.Add(task.Result);
            }
        }

        private async Task CreateEvent(Data.Outbreak outbreak,
            string outbreakEventType,
            string type,
            DateTime eventDate,
            string subType = "")
        {
            var Id = (int)await sequenceGenerator.GetNextAsync(SequenceType.OutbreakEventId);
            for ( int i = 0; i < type.Length; i+=1000)
            {
                var obEvent = new OutbreakEvents
                {
                    IdOutbreak = outbreak.IdOutbreak,
                    CdEventType = outbreakEventType,
                    CdSubType = subType,
                    DsDesc = type.Substring(i, Math.Min(type.Length - i, 1000)),
                    DtEvent = eventDate,
                    IdSequence = i / 1000,
                    IdEvent = Id
                };

            outbreak.OutbreakEvents.Add(obEvent);
            }
        }

        public async Task Execute(UpdateOutbreak command)
        {
            await SaveOutbreak(command);


            ///**********Results****************/
            //outbreak.AmTotalCases = command.Results.TotalCaseResults.TotalCases;
            //outbreak.AmTotalExposed = command.Results.TotalCaseResults.TotalExposed;

            //outbreak.AmMale = command.Results.GenderResults.MaleCases;
            //outbreak.AmFemale = command.Results.GenderResults.FemaleCases;
            //outbreak.AmGenderUnknown = command.Results.GenderResults.UnknownGenderCases;

            //outbreak.AmStaffCases = command.Results.StaffExposureResults.StaffCases;
            //outbreak.AmStaffExposed = command.Results.StaffExposureResults.StaffExposed;
            //outbreak.AmNonStaffCases = command.Results.StaffExposureResults.NonstaffCases;
            //outbreak.AmNonStaffExposed = command.Results.StaffExposureResults.NonstaffExposed;
            //outbreak.AmUnknownCases = command.Results.StaffExposureResults.UnknownCases;
            //outbreak.AmUnknownExposed = command.Results.StaffExposureResults.UnknownExposed;

            //outbreak.AmAgeLess1 = command.Results.AgeResults.AgeLessthan1;
            //outbreak.AmAge14 = command.Results.AgeResults.Age1to4;
            //outbreak.AmAge59 = command.Results.AgeResults.Age5to9;
            //outbreak.AmAge1019 = command.Results.AgeResults.Age10to19;
            //outbreak.AmAge2049 = command.Results.AgeResults.Age20to49;
            //outbreak.AmAge5074 = command.Results.AgeResults.Age50to74;
            //outbreak.AmAgeGreater74 = command.Results.AgeResults.AgeGreater74;
            //outbreak.AmAgeUnknown = command.Results.AgeResults.AgeUnknown;

            //outbreak.AmWithInfoSought = command.Results.OutComeResults.InfoAvailable;
            //outbreak.AmSoughtHealthcare = command.Results.OutComeResults.SoughtCases;
            //outbreak.AmErVisit = command.Results.OutComeResults.ErCases;
            //outbreak.AmHospitalization = command.Results.OutComeResults.InpatientCases;
            //outbreak.AmDied = command.Results.OutComeResults.DiedCases;
            //outbreak.AmWithInfoSought = command.Results.OutComeResults.SoughtCasesWithInfo;
            //outbreak.AmWithInfoErVisit = command.Results.OutComeResults.ErCasesWithInfo;
            //outbreak.AmWithInfoHospitalization = command.Results.OutComeResults.InpatientCasesWithInfo;
            //outbreak.AmWithInfoDied = command.Results.OutComeResults.DiedCasesWithInfo;

            ///**********Clinical results****************/
            //var firstOnsetDateOrMaxValue = String.IsNullOrEmpty(command.ClinicalResults.FirstOnsetDate) ? DateTime.MaxValue : Convert.ToDateTime(command.ClinicalResults.FirstOnsetDate);
            //var firstExposureDateOrMaxValue = String.IsNullOrEmpty(command.ClinicalResults.FirstExposureDate) ? DateTime.MaxValue : Convert.ToDateTime(command.ClinicalResults.FirstExposureDate);
            //var notifiedDate = Convert.ToDateTime(command.Background.NotifiedDate);

            //var minDate = new DateTime(Math.Min(((DateTime)firstExposureDateOrMaxValue).Ticks, (new DateTime(Math.Min(((DateTime)firstOnsetDateOrMaxValue).Ticks, ((DateTime)notifiedDate).Ticks))).Ticks));

            //bool noOutbreakLevelSurveyExists = !writeContext.Survey
            //    .Any(survey => survey.CdSurveyType == "OUTBREAK_LEVEL"
            //    && survey.IdOutbreak.Equals(command.OutbreakId)
            //    && (survey.IdSurveyVersion == 1));

            //bool diseaseCodeExists = !String.IsNullOrEmpty(command.Background.DiseaseHazard);

            //if (noOutbreakLevelSurveyExists && diseaseCodeExists)
            //{
            //    var existingOutbreakTemplateSurvey = await writeContext.Survey
            //        .Where(survey => survey.CdSurveyType.Equals("OUTBREAK_TEMPLATE")
            //        && survey.CdIcd9.Equals(command.Background.DiseaseHazard)
            //        && (survey.DtEffective <= minDate)
            //        && (survey.IdSurveyVersion == 1))
            //        .FirstOrDefaultAsync();

            //    if (existingOutbreakTemplateSurvey != null)
            //    {

            //        var newSurveyId = (int)await sequenceGenerator.GetNextAsync(SequenceType.Survey);


            //        Merlin.Core.Data.Survey newSurvey = new Merlin.Core.Data.Survey
            //        {
            //            IdSurvey = newSurveyId,
            //            NmSurvey = existingOutbreakTemplateSurvey.NmSurvey + " " + command.Background.EventName,
            //            IdOutbreak = command.OutbreakId,
            //            DtEffective = minDate,
            //            IdAdded = command.IdUser,
            //            DtAdded = DateTime.Now,
            //            UidLayout = existingOutbreakTemplateSurvey.UidLayout,
            //            CdSurveyType = "OUTBREAK_LEVEL",
            //            IdSurveyVersion = 1,
            //            UID = Guid.NewGuid()
            //        };

            //        writeContext.Survey.Add(newSurvey);
            //    }
            //}






            ///**********EpiCom****************/
            ////EpiCom post submitted separately

            //if (command.Epicom.PostId.HasValue)
            //{
            //    var currentPostId = await writeContext.OutbreakEvents
            //        .Where(x => x.CdEventType.Equals("EPICOM_POST_ID") && x.IdOutbreak == command.OutbreakId)
            //        .OrderByDescending(x => x.IdEvent)
            //        .Select(x => x.DsDesc)
            //        .FirstOrDefaultAsync();

            //    if (!command.Epicom.PostId.Equals(currentPostId))
            //    {
            //        EventId = (int)await sequenceGenerator.GetNextAsync(SequenceType.OutbreakEventId);



            //        OutbreakEvents newEvent = new OutbreakEvents
            //        {
            //            IdOutbreak = command.OutbreakId,
            //            CdEventType = "EPICOM_POST_ID",
            //            IdEvent = EventId,
            //            CdSubType = "",
            //            DsDesc = command.Epicom.PostId.ToString(),
            //            IdSequence = 0,
            //            IdAdded = command.Epicom.Author
            //        };

            //        writeContext.OutbreakEvents.Add(newEvent);
            //    }


            //}




        }

        public async Task Execute(SubmitOutbreak command)
        {
            command.ReviewStatus = OutbreakReviewStatus.Pending;
            await SaveOutbreak(command);
        }

        private async Task SaveOutbreak(UpdateOutbreak command)
        {
            var outbreak = await writeContext.Outbreak
                .Include(ob => ob.OutbreakEvents)
                .Include(ob => ob.OutbreakSymptoms)
                .FirstAsync(ob => ob.IdOutbreak == command.OutbreakId);

            using (var transaction = writeContext.Database.BeginTransaction())
            {
                //calculate the event date
                outbreak.DtOutbreakEvent = new DateTime?[]
                    {
                        outbreak.DtEarliestOnset,
                        outbreak.DtEarliestExposure,
                        outbreak.DtChdNotified,
                        outbreak.DtOutbreakEvent
                    }
                    .Where(d => d.HasValue)
                    .OrderBy(d => d)
                    .First();

                //so all events have the same timestamp
                var eventDate = DateTime.Now;

                await ReplaceEvents(outbreak, OutbreakEventType.Investigation, command.InvestigationMethods, eventDate, CodeType.OutbreakInvestigation);
                await ReplaceEvents(outbreak, OutbreakEventType.StudyDesign, command.StudyDesigns, eventDate, CodeType.OutbreakStudyDesign);
                await ReplaceEvents(outbreak, OutbreakEventType.MultiCounty, command.OtherCountiesList, eventDate, CodeType.County);
                await ReplaceEvents(outbreak, OutbreakEventType.MultiCountry, command.OtherCountriesList, eventDate, CodeType.Country, CodeType.Region);
                await ReplaceEvents(outbreak, OutbreakEventType.MultiState, command.OtherStatesList, eventDate, CodeType.State);
                await ReplaceEvents(outbreak, OutbreakEventType.Regulatory, command.RegulatoryAgencies, eventDate, CodeType.OutbreakRegulatory);

                await CreateEvent(outbreak, OutbreakEventType.CaseDefinition, command.CaseDefinition, eventDate);
                await CreateEvent(outbreak, OutbreakEventType.LabFindings, command.LabFindings, eventDate);
                await CreateEvent(outbreak, OutbreakEventType.Closure, command.Decisions, eventDate, OutbreakEventType.ConclusionNotes);
                await CreateEvent(outbreak, OutbreakEventType.Closure, command.Recommendations, eventDate, OutbreakEventType.Recommendations);
                await CreateEvent(outbreak, OutbreakEventType.ProcessImprovements, command.ImprovementAreas, eventDate);
                await CreateEvent(outbreak, OutbreakEventType.EpiComPostId, command.PostId.ToString(), eventDate);

                ReplaceSymptoms(outbreak, command.Symptom, command.OtherSymptom);

                outbreak.NmOutbreak = command.EventName;

                //if ICD9 changes update all associated cases
                if (outbreak.CdIcd9 != command.DiseaseHazard)
                {
                    string sql = "update dbo.epi_case set CD_ICD9 = @icd9 where id_outbreak = @outbreakId";

                    var connection = writeContext.Database.GetDbConnection().EnsureOpen();

                    await connection.ExecuteAsync(sql, new
                    {
                        icd9 = command.DiseaseHazard,
                        outbreakId = command.OutbreakId
                    }, transaction.GetDbTransaction());

                    outbreak.CdIcd9 = command.DiseaseHazard;

                    //only need to ensure a survey is created/exists when ICD9 changes
                    await EnsureOutbreakSurvey(outbreak);
                }

                outbreak.CdCountyInitiating = command.County;
                outbreak.InMultiCounty = command.OtherCountiesAffected;
                outbreak.InMultiState = command.OtherStatesAffected;
                outbreak.DsStateConsulted = command.StaffConsulted;
                outbreak.NmInvestigator = command.Investigator;
                outbreak.CdModeTransmission = command.TransmissionMode;
                outbreak.InFoodWater = command.FoodOrWaterRelated;
                outbreak.InVehicleFw = command.IsVehicleIdentified;
                outbreak.DsVehicleFw = command.Vehicle;
                outbreak.InHealthcare = command.HealthRelated;
                outbreak.CdVehicleIdentified = command.CauseForOutbreak;
                outbreak.DsVehicleHai = command.Description;
                outbreak.CdModeTransmission = command.TransmissionMode;
                outbreak.InFoodWater = command.FoodOrWaterRelated;
                outbreak.InVehicleFw = command.IsVehicleIdentified;
                outbreak.DsVehicleFw = command.Vehicle;
                outbreak.InHealthcare = command.HealthRelated;
                outbreak.CdVehicleIdentified = command.CauseForOutbreak;
                outbreak.DsVehicleHai = command.Description;
                outbreak.CdErDeptVisitsType = command.EmergencyVisitsType;
                outbreak.AmErDeptVisits = command.EmergencyVisits;
                outbreak.CdInpatientHosptialType = command.InpatientHospitalizationsType;
                outbreak.AmInpatientHospital = command.InpatientHospitalizations;
                outbreak.AmDeaths = command.Deaths;
                outbreak.CdDeathsType = command.DeathsType;




                outbreak.DtChdNotified = command.NotifiedDate;
                outbreak.CdReporterType = command.FirstNotified;
                outbreak.NmReporter = command.ReporterName ?? string.Empty;
                outbreak.DtInvestigated = command.InvestigationStarted;
                outbreak.DtClosed = command.InvestigationClosed;

                outbreak.CdStatus = outbreak.DtClosed != null ? "CLOSED" : "OPEN";

                outbreak.CdSyndromes = command.Syndrome;
                outbreak.DsSyndromeOther = command.OtherSyndrome;

                outbreak.DsDiseaseHazardOther = command.OtherDiseaseHazard;
                outbreak.AmEstimatedIll = command.EstimatedNumber.GetValueOrDefault();
                outbreak.InInvestigated = command.IsInvestigated;
                outbreak.InOutbreak = command.IsOutbreak;


                outbreak.InRecommendations = command.IsRecProvided;
                outbreak.CdRecommendationsHow = command.MethodofRec;

                //TODO:  this does not look correct
                outbreak.InImplemented = command.WereRecommendationsImplemented;
                outbreak.InInternalAction = command.IsReportCompleted;


                outbreak.DtEarliestExposure = command.FirstExposureDate;
                outbreak.DtLastExposure = command.LastExposureDate;
                outbreak.DtEarliestOnset = command.FirstOnsetDate;
                outbreak.DtLastOnset = command.LastOnsetDate;
                outbreak.AmMedianDuration = command.Duration;
                outbreak.CdMedianDurationUnit = command.TimeUnit;


                outbreak.InLabConfirmed = command.IsHumanSpecimens;
                outbreak.InLabConducted = command.IsLabTestingConducted;

                outbreak.AmLabConfirmed = (short?)command.NoOfCases;

                //TODO:  verify this does not look correct
                outbreak.InLabConfirmedFood = command.IsFoodSpecimens;

                outbreak.AmTotalCases = command.TotalCases;
                outbreak.CdTotalCaseType = command.TotalCaseType;
                outbreak.AmNonStaffCases = command.NonStaffCases;
                outbreak.AmStaffCases = command.StaffCases;
                outbreak.AmUnknownCases = command.UnknownCases;

                if (!string.IsNullOrWhiteSpace(command.Comments))
                {
                    await CreateEvent(outbreak, OutbreakEventType.Review, command.Comments, eventDate);
                }

                if (outbreak.CdReviewStatus != command.ReviewStatus)
                {
                    outbreak.IdReviewer = usernameProvider.GetUsername();
                    outbreak.DtReview = DateTime.Now;
                    outbreak.CdReviewStatus = command.ReviewStatus;
                }

                await writeContext.SaveChangesAsync();
                transaction.Commit();
            }

            //save survey
            //NOTE:  This is not transacted with outbreak save
            //if can be, but it requires detecting a current pending transaction inside survey answer save
            if (command.SurveyUid != null)
            {
                await surveyService.Execute(new SaveSurveyAnswers
                {
                    OutbreakId = outbreak.IdOutbreak,
                    Answers = command.SurveyAnswers,
                    SurveyId = command.SurveyUid.Value
                });
            }
        }

        private async Task EnsureOutbreakSurvey(Data.Outbreak outbreak)
        {
            //see if we need to create a survey
            //if ICD9 is not blank
            if (!string.IsNullOrWhiteSpace(outbreak.CdIcd9))
            {
                //see if a survey row for this outbreak/ICD9 exists
                bool surveyExists = await writeContext.Survey
                    .Where(survey => survey.DtEffective <= DateTime.Now)
                    .AnyAsync(survey => survey.CdIcd9 == outbreak.CdIcd9
                        && survey.IdOutbreak == outbreak.IdOutbreak
                        && survey.CdSurveyType == SurveyType.OutbreakLevel);

                //if the survey does not exist, see if a template exists
                if (!surveyExists)
                {
                    var template = await writeContext.Survey
                        .Where(survey => survey.DtEffective <= DateTime.Now)
                        .OrderByDescending(survey => survey.DtEffective)
                        .FirstOrDefaultAsync(survey => survey.CdIcd9 == outbreak.CdIcd9
                            && survey.CdSurveyType == SurveyType.OutbreakTemplate);

                    //if template exists, create the survey
                    if (template != null)
                    {
                        await surveyService.Execute(new CreateSurveyFromTemplate
                        {
                            OutbreakId = outbreak.IdOutbreak,
                            SurveyIdToClone = template.IdSurvey,
                            SurveyType = SurveyType.OutbreakLevel,
                            SurveyName = $"{outbreak.IdOutbreak} - {outbreak.NmOutbreak}",
                            EffectiveDate = outbreak.DtOutbreakEvent.Value
                        });
                    }
                }
            }
        }

        public async Task<OutbreakDocument> Execute(UploadDocument command)
        {
            var documentId = (int)await sequenceGenerator.GetNextAsync(SequenceType.EpiDocument);

            var document = new EpiDocument
            {
                BlEpiDocument = command.FilesBytes,
                DsMimeContentType = command.MIMEType,
                IdEpiDocument = documentId
            };

            var obDocument = new OutbreakDocument
            {
                IdEpiDocument = documentId,
                NmFile = command.FileName,
                CdEpiDocumentType = command.DocumentType,
                DsDesc = command.Description,
                DtEpiDocument = command.DocumentDate,
                IdSequence = command.Sequence,
                IdOutbreak = command.OutbreakId
            };

            await writeContext.EpiDocument.AddAsync(document);
            await writeContext.OutbreakDocument.AddAsync(obDocument);
            await writeContext.SaveChangesAsync();

            return obDocument;
        }

        public async Task Execute(DeleteDocument command)
        {
            var outbreakDocument = await writeContext.OutbreakDocument.FindAsync(command.Id);
            var epiDocument = await writeContext.EpiDocument.FindAsync(command.Id);

            if (outbreakDocument == null)
            {
                throw new EntityNotFoundException(typeof(OutbreakDocument), new { command.Id });
            }

            if (epiDocument == null)
            {
                throw new EntityNotFoundException(typeof(EpiDocument), new { command.Id });
            }

            writeContext.OutbreakDocument.Remove(outbreakDocument);
            writeContext.EpiDocument.Remove(epiDocument);

            await writeContext.SaveChangesAsync();
        }

        public async Task<OutbreakEvents> Execute(CreateOutbreakNote command)
        {
            var eventId = (int)await sequenceGenerator.GetNextAsync(SequenceType.OutbreakEventId);

            OutbreakEvents newEvent = new OutbreakEvents
            {
                IdOutbreak = command.OutbreakId,
                CdEventType = command.NoteType,
                IdEvent = eventId,
                CdSubType = string.Empty,
                DsDesc = command.Note,
                IdSequence = 0
            };

            writeContext.OutbreakEvents.Add(newEvent);

            await writeContext.SaveChangesAsync();

            return newEvent;
        }

        public async Task Execute(UpdateOutbreakNote command)
        {
            var obEvent = await writeContext.OutbreakEvents
                .FirstOrDefaultAsync(e => e.IdEvent == command.EventId);

            obEvent.DsDesc = command.Note;

            await writeContext.SaveChangesAsync();
        }

        public async Task Execute(DeleteOutbreakNote command)
        {
            var outbreakEvent = await writeContext.OutbreakEvents
                .FirstOrDefaultAsync(e => e.IdEvent == command.EventId);

            if (outbreakEvent == null)
            {
                throw new EntityNotFoundException(typeof(DeleteOutbreakNote), new { command.EventId });
            }

            writeContext.OutbreakEvents.Remove(outbreakEvent);

            await writeContext.SaveChangesAsync();
        }



        //TODO:  this needs major work
        public async Task<int> Execute(CreateSetting command)
        {
            var outbreak = await writeContext.Outbreak
                .Include(o => o.OutbreakSettings)
                .FirstOrDefaultAsync(o => o.IdOutbreak == command.OutbreakId);

            OutbreakSettings setting = new OutbreakSettings();

            setting.IdSetting = (short)await sequenceGenerator.GetNextAsync(SequenceType.OutbreakSettings);

            await SaveSetting(command, outbreak, setting);

            outbreak.OutbreakSettings.Add(setting);

            await writeContext.SaveChangesAsync();

            return setting.IdSetting;            
        }

        public async Task Execute(UpdateSetting command)
        {
            var outbreak = await writeContext.Outbreak
                .Include(o => o.OutbreakSettings)
                .FirstOrDefaultAsync(o => o.IdOutbreak == command.OutbreakId);

            var setting = outbreak.OutbreakSettings
                .FirstOrDefault(s => s.IdSetting == command.Id);

            if (setting == null)
            {
                throw new EntityNotFoundException(typeof(OutbreakSettings), command.Id);
            }

            await SaveSetting(command, outbreak, setting);

            await writeContext.SaveChangesAsync();
        }

        private async Task SaveSetting(CreateSetting command, Data.Outbreak outbreak, OutbreakSettings setting)
        {
            //if new setting is primary; set all others to not primary
            if (command.IsPrimary)
            {
                foreach (var s in outbreak.OutbreakSettings)
                {
                    s.InPrimary = false;
                }
            }

            setting.IdOutbreak = command.OutbreakId;
            setting.CdSetting = command.SettingType;
            setting.InPrimary = command.IsPrimary;
            setting.DsSettingOther = command.OtherType;
            setting.IdResourceSetting = command.SettingFacilityId;
            setting.DsAddress = command.Address.AddressLine1 ?? "";
            setting.DsAddress2 = command.Address.AddressLine2 ?? "";
            setting.DsCity = command.Address.City ?? "";
            setting.DsZip = command.Address.Zip ?? "";
            setting.CdState = command.Address.State ?? "";
            setting.CdCountry = command.Address.Country ?? "";
            setting.CdCounty = command.Address.County ?? "";
            setting.DsContactPhn = command.SettingContactPhone ?? "";
            setting.NmContact = command.SettingContact ?? "";


            if (command.SettingFacilityId.HasValue)
            {
                var facility = await writeContext.ResourceSetting
                    .FindAsync(command.SettingFacilityId);

                setting.NmFacility = facility.NmSetting;
                setting.DsAddress = facility.DsAddr1Name;
                setting.DsAddress2 = facility.DsAddr2;
                setting.DsCity = facility.DsCity;
                setting.DsZip = facility.DsZip;
                setting.CdCounty = facility.CdCounty;
                setting.CdCountry = facility.CdCountry;
            }

            //generate email alert on setting save
            var alerts = await writeContext.EpiUserAlerts
                .Where(alert => alert.CdAlert == AlertType.Outbreak)
                .Where(alert => alert.CdCounty == outbreak.CdCountyInitiating)
                .Select(alert => new EmailQueue
                {
                    IdUserRecipient = alert.IdUser,
                    CdAlert = alert.CdAlert,
                    CdCounty = alert.CdCounty,
                    CdEntity = AlertType.Outbreak,
                    CdProcessed = AlertStatus.NotSent,
                    IdEntity = outbreak.IdOutbreak.ToString()
                })
                .ToListAsync();

            await emailService.DispatchAlerts(alerts);
        }

        public async Task Execute(DeleteSetting command)
        {
            var setting = await writeContext.OutbreakSettings
                .FindAsync((short)command.Id);

            if (setting == null)
            {
                throw new EntityNotFoundException(typeof(OutbreakSettings), command.Id);
            }

            writeContext.OutbreakSettings.Remove(setting);

            await writeContext.SaveChangesAsync();
        }

        public async Task Execute(SubmitEpicomPost command)
        {
            //var outbreak = await writeContext.Outbreak.FindAsync(command.OutbreakId);

            //outbreak.IdEpicomPending = command.PendingPostId;

            //await writeContext.SaveChangesAsync();

            var currentForumId = await outbreakEventsRepository.GetEventDescription(command.OutbreakId, "EPICOM_FORUM");
            var currentTopicId = await outbreakEventsRepository.GetEventDescription(command.OutbreakId, "EPICOM_TOPIC");
            var currentTitle = await outbreakEventsRepository.GetEventDescription(command.OutbreakId, "EPICOM_TITLE");


            List<String> chunks = new List<String>();
            int os = 0;
            while (os < command.Message.Length)
            {
                int s = Math.Min(1000, command.Message.Length - os);
                chunks.Add(command.Message.Substring(os, s));
                os += s;
            }

            var currentMessageBody = "";

            var message = await writeContext.OutbreakEvents
                            .Where(x => x.CdEventType.Equals("EPICOM_MESSAGE") && x.IdOutbreak == command.OutbreakId)
                            .OrderByDescending(x => x.IdKey)
                            .Select(x => new
                            {
                                sequenceId = x.IdSequence,
                                desc = x.DsDesc
                            })
                            .ToListAsync();
            foreach (var m in message)
            {
                currentMessageBody = m.desc + currentMessageBody;
                if (m.sequenceId == 0)
                {
                    break;
                }

            }

            var EventId = (int)await sequenceGenerator.GetNextAsync(SequenceType.OutbreakEventId);

            OutbreakEvents PendingPostEvent = new OutbreakEvents
            {
                IdOutbreak = command.OutbreakId,
                CdEventType = "EPICOM_PENDING_ID",
                IdEvent = EventId,
                CdSubType = "",
                DsDesc = command.PendingPostId.ToString(),
                IdSequence = 0,
                IdAdded = command.IdSubmitted
            };

            if (!writeContext.OutbreakEvents.Any(outbreakEvent => (outbreakEvent.DsDesc.Equals(PendingPostEvent.DsDesc)) && (outbreakEvent.CdEventType.Equals(PendingPostEvent.CdEventType) && (outbreakEvent.IdOutbreak == PendingPostEvent.IdOutbreak))))
            {
                writeContext.OutbreakEvents.Add(PendingPostEvent);
            }

            if (!command.ForumId.ToString().Equals(currentForumId))
            {
                EventId = (int)await sequenceGenerator.GetNextAsync(SequenceType.OutbreakEventId);

                OutbreakEvents ForumEvent = new OutbreakEvents
                {
                    IdOutbreak = command.OutbreakId,
                    CdEventType = "EPICOM_FORUM",
                    IdEvent = EventId,
                    CdSubType = "",
                    DsDesc = command.ForumId.ToString(),
                    IdSequence = 0,
                    IdAdded = command.IdSubmitted
                };

                writeContext.OutbreakEvents.Add(ForumEvent);
            }

            if (!command.TopicId.ToString().Equals(currentTopicId))
            {
                EventId = (int)await sequenceGenerator.GetNextAsync(SequenceType.OutbreakEventId);

                OutbreakEvents TopicEvent = new OutbreakEvents
                {
                    IdOutbreak = command.OutbreakId,
                    CdEventType = "EPICOM_TOPIC",
                    IdEvent = EventId,
                    CdSubType = "",
                    DsDesc = command.TopicId.ToString(),
                    IdSequence = 0,
                    IdAdded = command.IdSubmitted
                };

                writeContext.OutbreakEvents.Add(TopicEvent);
            }


            if (!command.Title.Equals(currentTitle))
            {
                EventId = (int)await sequenceGenerator.GetNextAsync(SequenceType.OutbreakEventId);


                OutbreakEvents TitleEvent = new OutbreakEvents
                {
                    IdOutbreak = command.OutbreakId,
                    CdEventType = "EPICOM_TITLE",
                    IdEvent = EventId,
                    CdSubType = "",
                    DsDesc = command.Title,
                    IdSequence = 0,
                    IdAdded = command.IdSubmitted
                };

                writeContext.OutbreakEvents.Add(TitleEvent);
            }

            if (!String.IsNullOrEmpty(command.Message) && !command.Message.Equals(currentMessageBody))
            {
                int sequence = 0;
                OutbreakEvents MessageEvent;
                var EId = (int)await sequenceGenerator.GetNextAsync(SequenceType.OutbreakEventId);
                foreach (string chunk in chunks)
                {
                    MessageEvent = new OutbreakEvents
                    {
                        IdOutbreak = command.OutbreakId,
                        CdEventType = "EPICOM_MESSAGE",
                        IdEvent = EId,
                        CdSubType = "",
                        DsDesc = chunk,
                        IdSequence = sequence,
                        IdAdded = command.IdSubmitted
                    };

                    writeContext.OutbreakEvents.Add(MessageEvent);
                    sequence += 1;
                }
            }




            await writeContext.SaveChangesAsync();






        }

    }


}
