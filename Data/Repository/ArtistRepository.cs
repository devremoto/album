using Domain.Entities;
using Domain.Interfaces.Repository;
using Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infra.Data.Repository
{
    public class ArtistRepository : BaseRepository<Artist>, IArtistRepository
    {
        public ArtistRepository(AppDbContext context) : base(context)
        {

        }
    }
}
