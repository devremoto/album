using Domain.Entities;
using Domain.Interfaces.Repository;
using Domain.Interfaces.Services;

namespace Services
{
	public class ArtistService:BaseService<Artist>,IArtistService
  {
    public ArtistService(IArtistRepository repository)
    :base(repository)
    {

    }
  }
}
