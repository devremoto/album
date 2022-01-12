using Application.Interfaces;
using Application.ViewModels;
using Application.ViewModels.Common;
using AutoMapper;
using CrossCutting.Extensions;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Interfaces.Services;
using System.Collections.Generic;
using System.Linq;

namespace Application.Services
{
    public class AlbumAppService : BaseAppService<Album>, IAlbumAppService
	{
		private readonly IAlbumService _albumService;
		private readonly IMapper _mapper;

		public AlbumAppService(IAlbumService albumService, IUnitOfWork uow, IMapper mapper)
		: base(albumService, uow)
		{
			_albumService = albumService;
			_mapper = mapper;
		}

        public PagingViewModel<Album> Search(PagingViewModel<AlbumViewModel> page, params string[] includeProperties)
        {
            var paging = _baseService.GetAll(includeProperties);

            if (page.Query != null)
            {
                Album query = _mapper.Map<Album>(page.Query);
                
                if (!string.IsNullOrWhiteSpace(query?.Title))
                {
                    paging = paging.Where(x => x.Title.Contains(query.Title));
                }

                if (!string.IsNullOrWhiteSpace(query?.Artist?.Name))
                {
                    paging = paging.Where(x => x.Artist.Name.Contains(query.Artist.Name));
                }

                if (!string.IsNullOrWhiteSpace(query?.AlbumType?.Name))
                {
                    paging = paging.Where(x => x.AlbumType.Name.Contains(query.AlbumType.Name));
                }

                if (query?.Stock>0)
                {
                    paging = paging.Where(x => x.Stock == query.Stock);
                }
            }

            var model = paging.Paging(page.Number, page.Size, page.OrderBy, page.OrderDirection);
            page.List = _mapper.Map<List<AlbumViewModel>>(model.Item1.ToList());
            page.TotalCount = model.Item2;
            return _mapper.Map<PagingViewModel<Album>>(page);

        }
    }
}