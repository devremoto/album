using Domain.Entities;
using Domain.Interfaces.Repository;
using Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infra.Data.Repository
{
    public class AlbumTypeRepository : BaseRepository<AlbumType>, IAlbumTypeRepository
    {
        public AlbumTypeRepository(AppDbContext context) : base(context)
        {

        }
    }
}
