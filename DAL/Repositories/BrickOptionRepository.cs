using DAL.Entities;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class BrickOptionRepository : BaseRepository<BrickOption, ApplicationDbContext>, IBrickOptionRepository
    {
        public BrickOptionRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
