using Application.ViewModels;
using Application.ViewModels.Common;
using AutoMapper;
using Domain.Entities;

namespace Application.AutoMapper
{
    public class ModelToViewModel : Profile
    {
        public ModelToViewModel()
        {
            #region AutoMapper
            CreateMap(typeof(PagingViewModel<>), typeof(PagingViewModel<>));

            #region Album
            CreateMap<Album, AlbumViewModel>().ReverseMap();
            #endregion

            #region Artist
            CreateMap<Artist, ArtistViewModel>().ReverseMap();
            #endregion

            #region AlbumType
            CreateMap<AlbumType, AlbumTypeViewModel>().ReverseMap();
            #endregion

            #endregion AutoMapper
        }
    }
}
