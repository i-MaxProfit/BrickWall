using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.DTO
{
    public class BrickOptionDTO
    {
        public int Id { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public decimal Weight { get; set; }
        public decimal Price { get; set; }
        public int CountOnPalette { get; set; }
        public int BrickTypeId { get; set; }
        public BrickType BrickType { get; set; }
        public virtual DateTime CreationDate { get; set; }
        public bool IsDelete { get; set; }
    }
}
