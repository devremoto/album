using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Interfaces.Services;
using System.Linq;

namespace Application.Services
{
	public class AlbumTypeAppService : BaseAppService<AlbumType>, IAlbumTypeAppService
	{
		private readonly IAlbumTypeService _albumTypeService;
		private readonly IMapper _mapper;

		public AlbumTypeAppService(IAlbumTypeService albumTypeService, IUnitOfWork uow, IMapper mapper)
		: base(albumTypeService, uow)
		{
			_albumTypeService = albumTypeService;
			_mapper = mapper;
		}
	}
}