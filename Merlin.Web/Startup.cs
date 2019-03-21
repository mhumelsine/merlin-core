using Merlin.Web.Helpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Isf.Core.Data;
using Isf.Core.Utils;
using Isf.Core.Utils.Logging;
using Isf.Core.Utils.Serialization;
using Merlin.Core.Data.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using Merlin.Core.Survey.Services;
using Merlin.Core.Survey.Rules;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Codes.Rules;
using Merlin.Core.Codes.Services;
using Merlin.Web.Filters;
using Merlin.Core.Outbreak.Rules;
using Merlin.Core.Outbreak.Services;
using Merlin.Core.EpiUser.Services;
using Microsoft.AspNetCore.Http;
using Merlin.Core.Elr.Services;
using Merlin.Core.ELRSearch.Rules;
using Merlin.Core.ELRSearch.Services;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using Isf.Core.Security;
using Merlin.Core.SmartGoals.Services;

namespace Merlin.Web
{
    public class Startup
    {
        private const string CLIENT_APP_PATH = "client-app";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = $"{CLIENT_APP_PATH}/build";
            });

            IConfigurationRoot config = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();

            var str = config.GetConnectionString("MerlinDataContext");
            var elrStr = config.GetConnectionString("ELRDataContext");

            services.AddDbContext<MerlinReadContext>(options => options.UseSqlServer(str));
            services.AddDbContext<MerlinWriteContext>(options => options.UseSqlServer(str));

            services.AddDbContext<ELRReadContext>(options => options.UseSqlServer(elrStr));
            services.AddDbContext<ELRWriteContext>(options => options.UseSqlServer(elrStr));

            services.AddScoped<ISequenceGenerator, DbSequenceGenerator>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IUsernameProvider, HttpContextUsernameProvider>();
            services.AddScoped<IProcessNameProvider, StaticProcessNameProvider>(provider => new StaticProcessNameProvider("Survey Builder"));

            services.AddScoped<IConnectionFactory>(provider => new SqlConnectionFactory(str));

            services.AddScoped<Isf.Core.Utils.Logging.ILogger, NLogLogger>();

            services.AddScoped<IJwtTokenBuilder, ConfigBasedJwtTokenBuilder>();

            services.AddScoped<JwtTokenDirector>();

            services.AddScoped<JwtTokenFactory>();

            services.AddScoped<MerlinReadStore>();

            //so we can inject a different connection string easily
            services.AddScoped<ElrReadStore>(provider =>
                new ElrReadStore(provider.GetRequiredService<Isf.Core.Utils.Logging.ILogger>(), new SqlConnectionFactory(elrStr)));

            services.AddTransient<LayoutRules>();
            services.AddTransient<ObjectMappingRules>();
            services.AddTransient<QuestionRules>();
            services.AddTransient<CodeRules>();
            services.AddTransient<SurveyRules>();
            services.AddTransient<LayoutService>();
            services.AddTransient<LayoutRepository>();
            services.AddTransient<QuestionService>();
            services.AddTransient<ObjectMappingService>();
            services.AddTransient<CodeRepository>();
            services.AddTransient<SurveyService>();
            services.AddTransient<OutbreakRules>();
            services.AddTransient<OutbreakService>();
            services.AddTransient<SurveyAnswerRepository>();
            services.AddTransient<DataServices>();
            services.AddTransient<SurveyAnswerRules>();
            services.AddTransient<AuthenticationService>();
            services.AddTransient<EpicomRepository>();
            services.AddTransient<OutbreakRepository>();
            services.AddTransient<ELRSearchService>();
            services.AddTransient<ELRSearchRepository>();
            services.AddTransient<EmailService>();
            services.AddTransient<ELRSearchRules>();
            services.AddTransient<SmartGoalsRepository>();

            services.AddMvc(options =>
            {
                options.CacheProfiles.Add("Default",
                    new CacheProfile()
                    {
                        Duration = 60
                    });
                options.CacheProfiles.Add("Never",
                    new CacheProfile()
                    {
                        Duration = 0,
                        NoStore = true
                    });
            })
            .ConfigureApiBehaviorOptions(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
                options.SuppressUseValidationProblemDetailsForInvalidModelStateResponses = false;
            })
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
            .AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesExceptDictionaryContractResolver();
                options.SerializerSettings.Converters.Add(new CustomDatetimeConverter("MM/dd/yyyy"));
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            services.AddResponseCaching();

            services.AddAuthentication(IISDefaults.AuthenticationScheme);

            services.AddAuthorization(options =>
            {
                options.AddPolicy("EpiComUser", policy => policy.RequireClaim(MerlinClaim.EpiComUserId));
            });

            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new RequireHttpsAttribute());
                options.Filters.Add(typeof(DefaultExceptionFilterAttribute));
            });

            //TODO:  May need to move this to a reusable location
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateActor = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();


            app.UseResponseCaching();

            //having to set manually, will not load from configSetting LayoutRenderer
            NLog.GlobalDiagnosticsContext.Set("connectionString", Configuration["ConnectionStrings:MerlinDataContext"]);

            loggerFactory.AddNLog();

            var options = new RewriteOptions()
                .AddRedirectToHttps();

            app.UseRewriter(options);

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());


            //TODO:  THis does not look production ready

            app.Use(async (context, next) =>
            {
                const int STATUS_CODE = (int)System.Net.HttpStatusCode.Found;
                const string PARAM_NAME = "param=";

                var request = context.Request;
                var response = context.Response;
                var originalUrl = request.Path.Value;
                var queryString = request.QueryString.Value ?? string.Empty;

                if (queryString.Contains(PARAM_NAME, StringComparison.OrdinalIgnoreCase))
                {
                    var host = request.Host;
                    var decryptedText = queryString.Split(PARAM_NAME)[1];
                    var encryptedQueryString = $"{PARAM_NAME}{MerlinUrlHelpers.Encrypt(decryptedText)}";
                    var hostname = env.IsDevelopment() ? "localhost:44370/MerlinNet.18.2" : host.Value;

                    var query = $"page={request.Path}&param={MerlinUrlHelpers.Encrypt(decryptedText)}";

                    var encodedQueryString = Convert.ToBase64String(Encoding.UTF8.GetBytes(query));

                    var redirectToUrl = $"{request.Scheme}://{hostname}/xfer.html?data={encodedQueryString}";

                    response.StatusCode = STATUS_CODE;
                    response.Headers[HeaderNames.Location] = redirectToUrl;
                    return;
                }
                await next();
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = CLIENT_APP_PATH;

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
