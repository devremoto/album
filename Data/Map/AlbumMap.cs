using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infra.Data.Map
{
	public class AlbumMap : IEntityTypeConfiguration<Album>
	{
		public void Configure(EntityTypeBuilder<Album> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(a => a.Id).ValueGeneratedOnAdd();
			builder.Property(a => a.Title);
			builder.Property(a => a.ArtistId);
			builder.Property(a => a.AlbumTypeId);
			builder.HasOne(x => x.AlbumType).WithMany().HasForeignKey(x => x.AlbumTypeId);
			builder.HasOne(x => x.Artist).WithMany().HasForeignKey(x => x.ArtistId);
			builder.ToTable("Album");
		}
	}
}