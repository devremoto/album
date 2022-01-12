using Api.Controllers.Base;
using Application.Interfaces;
using Application.ViewModels;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumTypeController : CrudBaseController<AlbumType, AlbumTypeViewModel>
    {

        public AlbumTypeController(IAlbumTypeAppService service, IMapper mapper, ILogger<AlbumType> logger)
            : base(service, mapper, logger)
        {

        }

    }
}