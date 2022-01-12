using Application.ViewModels;
using Application.ViewModels.Common;
using Domain.Entities;
using System;

namespace Application.Interfaces
{
	public interface IAlbumAppService : IBaseAppService<Album>
	{
		PagingViewModel<Album> Search(PagingViewModel<AlbumViewModel> page, params string[] includeProperties);

	}
}
