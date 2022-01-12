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
    public class ArtistController : CrudBaseController<Artist, ArtistViewModel>
    {

        public ArtistController(IArtistAppService service, IMapper mapper, ILogger<Artist> logger)
            : base(service, mapper, logger)
        {

        }

    }
}