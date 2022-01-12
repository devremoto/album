using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infra.Data.Map
{
	public class ArtistMap : IEntityTypeConfiguration<Artist>
	{
		public void Configure(EntityTypeBuilder<Artist> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(a => a.Id).ValueGeneratedOnAdd();
			builder.Property(a => a.Name);
			builder.ToTable("Artist");
		}
	}
}