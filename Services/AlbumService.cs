using Domain.Entities;
using Domain.Interfaces.Repository;
using Domain.Interfaces.Services;

namespace Services
{
	public class AlbumService:BaseService<Album>,IAlbumService
  {
    public AlbumService(IAlbumRepository repository)
    :base(repository)
    {

    }
  }
}
