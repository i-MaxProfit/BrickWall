using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public abstract class BaseEntity : IBaseEntity
    {
        public virtual int Id { get; set; }
        public virtual DateTime CreationDate { get; set; }
        public bool IsDelete { get; set; }
    }
}
