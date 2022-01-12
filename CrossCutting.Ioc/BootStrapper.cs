using Application.AutoMapper;
using Application.Interfaces;
using Application.Services;
using AutoMapper;
using CrossCutting.Services.Configuration;
using CrossCutting.Services.Mail;
using CrossCutting.Services.Zip;
using Data.UoW;
using Domain.Interfaces;
using Domain.Interfaces.Repository;
using Domain.Interfaces.Services;
using Domain.Settings;
using Infra.Data.Context;
using Infra.Data.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Services;
using System.IO;
using System.Linq;
using System.Reflection;

namespace CrossCutting.Ioc
{
    public static class BootStrapper
    {
        private static IConfiguration _configuration;
        private static AppSettings _settings;
        private static IHostEnvironment _env;
        private static ServiceProvider _provider;


        public static void AddServices(this IServiceCollection services, IConfiguration configuration, IHostEnvironment env, ILoggerFactory loggerFactory)
        {
            services
            .AddConfiguration(configuration, env)
            .AddLogConfiguration()
            .AddSmtpConfiguration(configuration)
            .AddCors()
            .AddServices()
            .AddCrudServices()
            .AddAutoMapper();


        }
        private static IServiceCollection AddCrudServices(this IServiceCollection services)
        {
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
            services.AddScoped(typeof(IBaseAppService<>), typeof(BaseAppService<>));

            #region CrudServices
           


            

            #region Album
            services.AddTransient<IAlbumAppService, AlbumAppService>();
            services.AddTransient<IAlbumService, AlbumService>();
            services.AddTransient<IAlbumRepository, AlbumRepository>();
            #endregion Album


            

            #region Artist
            services.AddTransient<IArtistAppService, ArtistAppService>();
            services.AddTransient<IArtistService, ArtistService>();
            services.AddTransient<IArtistRepository, ArtistRepository>();
            #endregion Artist


            

            #region AlbumType
            services.AddTransient<IAlbumTypeAppService, AlbumTypeAppService>();
            services.AddTransient<IAlbumTypeService, AlbumTypeService>();
            services.AddTransient<IAlbumTypeRepository, AlbumTypeRepository>();
            #endregion AlbumType


            #endregion CrudServices
            return services;
        }
        private static IServiceCollection AddCors(this IServiceCollection services)
        {

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    if (_env.IsDevelopment())
                    {
                        builder.AllowAnyMethod().AllowAnyHeader().WithOrigins(_settings.Cors.Origins).AllowCredentials();
                    }
                    else
                    {
                        builder.WithOrigins(_settings.Cors.Origins).AllowAnyHeader().AllowAnyMethod();
                    }
                });
            });

            return services;
        }
        private static IServiceCollection AddConfiguration(this IServiceCollection services, IConfiguration configuration, IHostEnvironment env)
        {
            _env = env;
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            _configuration = builder.Build();



            configuration = _configuration;
            services.AddOptions();
            _settings = _configuration.GetSection(AppSettings.SECTION).Get<AppSettings>();
            _settings.ImageFolder = Path.Combine(env.ContentRootPath, "images");
            if (!Directory.Exists(_settings.ImageFolder))
            {
                Directory.CreateDirectory(_settings.ImageFolder);
            }
            services.AddSingleton(_settings);
            return services;
        }

        private static IServiceCollection AddLogConfiguration(this IServiceCollection services)
        {
            services.AddLogging(loggingBuilder =>
            {
                var logSection = _configuration.GetSection("Logging");
                loggingBuilder
                .AddConfiguration(logSection)
                .AddFile("Logs/myapp-{Date}.txt")
                .AddConsole();
            });

            return services;
        }
        private static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<IZipCode, ZipCodeBr>();
            return services;
        }

        #region database
        public static IServiceCollection AddDatabase<TContext>(this IServiceCollection services, ILoggerFactory factory = null) where TContext : DbContext
        {
            _ = _settings.DbType switch
            {
                DbType.SQL => services.AddSql<TContext>(factory),
                DbType.MYSQL => services.AddMysql<TContext>(factory),
                DbType.SQLLITE => services.AddSqlite<TContext>(factory),
                DbType.INMEMORY => services.AddSqlInMemory<TContext>(factory),
                DbType.POSTGRESQL => services.AddPostgres<TContext>(factory),
                _ => services.AddSql<TContext>(factory)
            };

            return services.SeedData();
        }
        private static IServiceCollection AddSql<TContext>(this IServiceCollection services, ILoggerFactory factory = null) where TContext : DbContext

        {
            services.AddDbContext<TContext>(options =>
            {
                options.UseSqlServer(_settings.ConnectionStrings.Sql, opts =>
                {
                    opts.EnableRetryOnFailure();
                });
                if (_settings.EnableSensitiveDataLogging)
                {
                    options.EnableSensitiveDataLogging();
                    if (factory != null)
                        options.UseLoggerFactory(factory);
                }
            });
            return services;
        }

        private static IServiceCollection AddMysql<TContext>(this IServiceCollection services, ILoggerFactory factory = null) where TContext : DbContext
        {
            services.AddDbContext<TContext>(options =>
            {
                var loggerFactory = new LoggerFactory();
                //var version = ServerVersion.AutoDetect(_settings.ConnectionStrings.MySql);
                options.UseMySql(_settings.ConnectionStrings.MySql,ServerVersion.FromString("5.6.26-mysql")
                    ,opts =>
               {
                   opts.EnableRetryOnFailure();
               });
                if (_settings.EnableSensitiveDataLogging)
                {
                    options.EnableSensitiveDataLogging();
                    if (factory != null)
                        options.UseLoggerFactory(factory);
                }
            });
           
            return services;
        }

        public static IServiceCollection AddSqlInMemory<TContext>(this IServiceCollection services, ILoggerFactory factory = null) where TContext : DbContext
        {
            services.AddDbContext<TContext>(options =>
            {
                //options.UseInMemoryDatabase(_settings.ConnectionStrings.InMemory, opts =>
                //{
                //});
                //if (_settings.EnableSensitiveDataLogging)
                //{
                //    options.EnableSensitiveDataLogging();
                //    if (factory != null)
                //        options.UseLoggerFactory(factory);
                //}
            });
            return services;

        }

        public static IServiceCollection AddSqlite<TContext>(this IServiceCollection services, ILoggerFactory factory = null) where TContext : DbContext
        {
            services.AddDbContext<TContext>(options =>
            {
                options.UseSqlite(_settings.ConnectionStrings.Sqlite, opts =>
                {
                });
                if (_settings.EnableSensitiveDataLogging)
                {
                    options.EnableSensitiveDataLogging();
                    if (factory != null)
                        options.UseLoggerFactory(factory);
                }
            });
            return services;

        }

        public static IServiceCollection AddPostgres<TContext>(this IServiceCollection services, ILoggerFactory factory = null) where TContext : DbContext
        {
            services.AddDbContext<TContext>(options =>
            {
                options.UseNpgsql(_settings.ConnectionStrings.PostgreSql, opts =>
                {
                    opts.EnableRetryOnFailure();
                });
                if (_settings.EnableSensitiveDataLogging)
                {
                    options.EnableSensitiveDataLogging();
                    if (factory != null)
                        options.UseLoggerFactory(factory);
                }
            });
            return services;

        }
        #endregion
        private static IServiceCollection AddAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(ModelToViewModel).GetTypeInfo().Assembly);
            return services;

        }

        private static IServiceCollection SeedData(this IServiceCollection services)
        {
            _provider = services.BuildServiceProvider();
            using (var serviceScope = _provider.GetService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetService<AppDbContext>().EnsureSeedData();
            }

            return services;
        }

        public static T GetConfiguration<T>(this IConfiguration configuration) where T : class
        {
            return configuration.GetSection(typeof(T).Name).Get<T>();
        }

        public static IServiceCollection AddSmtpConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            var smtpConfiguration = configuration.GetSection($"{AppSettings.SECTION}:SmtpConfiguration").Get<SmtpConfiguration>();
            services.AddSingleton(smtpConfiguration);
            services.AddTransient<IEmailService, EmailService>();
            return services;
        }
    }
}
