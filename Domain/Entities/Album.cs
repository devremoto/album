using System;
namespace Domain.Entities
{
    public class Album
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public AlbumType AlbumType { get; set; }
        public Guid AlbumTypeId { get; set; }
        public Artist Artist { get; set; }
        public Guid ArtistId { get; set; }
        public int Stock { get; set; }
    }
}
