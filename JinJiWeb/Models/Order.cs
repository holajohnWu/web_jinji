using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace JinJiWeb.Models {
    public class Order {
        [Required]
        public int Id { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        public int Month { get; set; }

        [Required]
        public int Day { get; set; }

        public double Sum { get; set; }

        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}