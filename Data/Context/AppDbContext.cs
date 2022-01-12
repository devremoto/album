using Domain.Entities;
using Infra.Data.Map;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Linq;

namespace Infra.Data.Context
{
    public class AppDbContext : DbContext
    {
        private readonly bool _useMap = true;
        #region DBSet

        public DbSet<Album> Album { get; set; }
        	public DbSet<Artist> Artist { get; set; }
	public DbSet<AlbumType> AlbumType { get; set; }
#endregion DbSet
        public AppDbContext()
        {
        }


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region MAP

            modelBuilder.ApplyConfiguration(new AlbumMap());
            modelBuilder.ApplyConfiguration(new ArtistMap());
modelBuilder.ApplyConfiguration(new AlbumTypeMap());
#endregion MAP

            if (_useMap)
                foreach (var entityType in modelBuilder.Model.GetEntityTypes())
                {
                    if (!entityType.Name.StartsWith("Domain.Entities.User"))
                    {
                        modelBuilder.Entity(entityType.Name).Property<DateTime?>("LastModified");
                        modelBuilder.Entity(entityType.Name).Property<DateTime?>("AddedIn");
                        modelBuilder.Entity(entityType.Name).Ignore("IsDirty");
                    }
                }

        }

        public override int SaveChanges()
        {

            if (_useMap)
            {
                foreach (var entry in ChangeTracker.Entries()
                 .Where(e => e.State == EntityState.Added))
                {
                    entry.Property("AddedIn").CurrentValue = DateTime.Now;
                }

                foreach (var entry in ChangeTracker.Entries()
                 .Where(e => e.State == EntityState.Added ||
                             e.State == EntityState.Modified))
                {
                    entry.Property("LastModified").CurrentValue = DateTime.Now;
                }
            }
            return base.SaveChanges();
        }
    }

    public static class AppDbContextExtensions
    {
        public static void EnsureSeedData(this AppDbContext context)
        {
            context.Check();
        }


        private static void EnsureSeedDbContextData(this AppDbContext context)
        {

            context.SaveChanges();

        }

        public static bool AllMigrationsApplied<T>(this T context) where T : DbContext
        {
            var applied = context.GetService<IHistoryRepository>()
                .GetAppliedMigrations()
                .Select(m => m.MigrationId);

            var total = context.GetService<IMigrationsAssembly>()
                .Migrations
                .Select(m => m.Key);

            return !total.Except(applied).Any();
        }

        public static void Check(this AppDbContext context)
        {


            if (!context.AllMigrationsApplied())
            {
                context.Database.Migrate();
                context.EnsureSeedDbContextData();
            }
            else
            {
                context.EnsureSeedDbContextData();
            }
        }


    }
}
