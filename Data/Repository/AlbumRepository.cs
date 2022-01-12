using Domain.Entities;
using Domain.Interfaces.Repository;
using Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infra.Data.Repository
{
    public class AlbumRepository : BaseRepository<Album>, IAlbumRepository
    {
        public AlbumRepository(AppDbContext context) : base(context)
        {

        }
    }
}
