using Dapper;
using Merlin.Core.Case;
using Merlin.Data.Services;
using System;
using System.Threading.Tasks;

namespace Merlin.Core.Survey.Services
{
    internal class TravelHistoryWriteHandler : SurveyWriteHandler
    {
        public TravelHistoryWriteHandler()
            :base(SurveyControlType.TravelHistory)
        {

        }
        protected async override Task HandleInnerAsync(SurveyAnswerWriteContext context)
        {
            var travel = (context.Delta.Incoming ?? context.Delta.Current) as TravelHistoryDto;

            var param = new {
                context.UserId,
                context.Timestamp,
                context.CaseId,
                travel.TravelId,
                travel.LocationExposed,
                travel.LocationName,
                travel.Notes,
                travel.BeginDate,
                travel.EndDate,
                travel.Address.AddressLine1,
                travel.Address.AddressLine2,
                travel.Address.City,
                travel.Address.State,
                travel.Address.County,
                travel.Address.Country,
                travel.Address.Zip
            };

            switch (context.Delta.State)
            {
                case AnswerState.Added:
                    await context.Connection.ExecuteAsync(
                        @"INSERT INTO [dbo].[TRAVEL_HISTORY]
                            ([id_travel_history]
                            ,[id_case]
                            ,nm_facility
                            ,cd_traveler
                            ,[ds_address1]
                            ,[ds_address2]
                            ,[ds_city]
                            ,[cd_state]
                            ,[ds_zip]
                            ,[dt_stay_begin]
                            ,[dt_stay_end]
                            ,[ds_comments]
                            ,[id_added]
                            ,[dt_added]
                            ,[cd_country]
                            ,[cd_travel_type]
                            ,[CD_COUNTY])
                        VALUES
                            (next value for dbo.seq_travel_history
                            ,@caseId
                            ,''
                            ,'PATIENT'
                            ,@AddressLine1
                            ,@AddressLine2
                            ,@City
                            ,@State
                            ,@Zip
                            ,@BeginDate
                            ,@EndDate
                            ,@Notes
                            ,@userId
                            ,@timestamp
                            ,@Country
                            ,@LocationExposed
                            ,@County)", 
                        param, 1, context.Transaction);
                    break;

                case AnswerState.Modified:
                    await context.Connection.ExecuteAsync(
                        @"update [dbo].[TRAVEL_HISTORY]
                            set [id_case] = @caseId
                                ,[ds_address1] = @AddressLine1
                                ,[ds_address2] = @AddressLine2
                                ,[ds_city] = @City
                                ,[cd_state] = @State
                                ,[ds_zip] = @Zip
                                ,[dt_stay_begin] = @BeginDate
                                ,[dt_stay_end] = @EndDate
                                ,[ds_comments] = @Notes
                                ,[id_changed] = @userId
                                ,[dt_changed] = @timestamp
                                ,[cd_country] = @Country
                                ,cd_travel_type = @LocationExposed
                                ,[CD_COUNTY] = @County
                            where id_travel_history = @travelId",
                        param, 1, context.Transaction);
                    break;

                case AnswerState.Deleted:
                    await context.Connection.ExecuteAsync(
                        "delete from dbo.travel_history where id_travel_history = @travelId",
                        param, 1, context.Transaction);
                    break;

                default:
                    throw new InvalidOperationException(
                        $"No save operation defined for state '{context.Delta.State}'");
            }
        }
    }
}
