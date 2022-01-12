using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Interfaces.Services;
using System.Linq;

namespace Application.Services
{
	public class ArtistAppService : BaseAppService<Artist>, IArtistAppService
	{
		private readonly IArtistService _artistService;
		private readonly IMapper _mapper;

		public ArtistAppService(IArtistService artistService, IUnitOfWork uow, IMapper mapper)
		: base(artistService, uow)
		{
			_artistService = artistService;
			_mapper = mapper;
		}
	}
}