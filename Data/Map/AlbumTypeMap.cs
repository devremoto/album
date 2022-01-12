using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infra.Data.Map
{
	public class AlbumTypeMap : IEntityTypeConfiguration<AlbumType>
	{
		public void Configure(EntityTypeBuilder<AlbumType> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(a => a.Id).ValueGeneratedOnAdd();
			builder.Property(a => a.Name);
			builder.ToTable("AlbumType");
		}
	}
}