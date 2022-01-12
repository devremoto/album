using System;
namespace Application.ViewModels
{
    public class AlbumViewModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public AlbumTypeViewModel AlbumType { get; set; }
        public Guid AlbumTypeId { get; set; }
        public ArtistViewModel Artist { get; set; }
        public Guid ArtistId { get; set; }
        public int Stock { get; set; }
    }
}