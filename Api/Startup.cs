using CrossCutting.Ioc;
using Domain.Settings;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Api.Swagger;
using Microsoft.Extensions.Logging;
using Api.Helpers.Upload;
using Infra.Data.Context;

namespace Api
{

    public class Startup
    {
        public readonly IConfiguration _configuration;
        private readonly AppSettings _settings;
        private readonly IWebHostEnvironment _env;

        private static readonly ILoggerFactory DbLoggerFactory
   = LoggerFactory.Create(builder =>
   {
       builder
           .AddConsole();

   });
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
            _settings = _configuration.GetSection(AppSettings.SECTION).Get<AppSettings>();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddServices(_configuration, _env, DbLoggerFactory);
            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
                })
            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling =
                                           Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            ;
            services
           .AddMvcCore(options => { })
           .AddApiExplorer();
            services.AddSwagger(_settings);
            services.AddScoped<IUploadHelper, UploadHelper>();
            services.AddDatabase<AppDbContext>(DbLoggerFactory);



        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("CorsPolicy");
            app.UseDeveloperExceptionPage();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseDeveloperExceptionPage();

            app.UseHttpsRedirection();


            app.UseAppSwagger(_settings);

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
