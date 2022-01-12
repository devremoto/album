using Domain.Entities;
using Domain.Interfaces.Repository;
using Domain.Interfaces.Services;

namespace Services
{
	public class AlbumTypeService:BaseService<AlbumType>,IAlbumTypeService
  {
    public AlbumTypeService(IAlbumTypeRepository repository)
    :base(repository)
    {

    }
  }
}
