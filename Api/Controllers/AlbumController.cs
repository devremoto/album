using Api.Controllers.Base;
using Application.Interfaces;
using Application.ViewModels;
using Application.ViewModels.Common;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : CrudBaseController<Album, AlbumViewModel>
    {
        private new readonly IAlbumAppService _service;
        public AlbumController(IAlbumAppService service, IMapper mapper, ILogger<Album> logger)
            : base(service, mapper, logger)
        {
            _service = service;
        }

        [HttpGet]
        public override async Task<ActionResult> Get([FromQuery] PagingViewModel<AlbumViewModel> page)
        {
            try
            {
                if (page.Size == 0 && page.Number == 0)
                {
                    var result = _service.GetAll("Artist", "AlbumType");
                    return Ok(await Task.FromResult(_mapper.Map<PagingViewModel<AlbumViewModel>>(result)));
                }
                else
                {
                    var result = _service.Search(page, "Artist", "AlbumType");
                    _mapper.Map<PagingViewModel<AlbumViewModel>>(result);
                    return Ok(await Task.FromResult(_mapper.Map<PagingViewModel<AlbumViewModel>>(result)));
                }
            }
            catch (ArgumentException ex)
            {
                return ServerError(ex.Message);
            }
        }

    }
}