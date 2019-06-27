using System.ComponentModel.DataAnnotations;

namespace JinJiWeb.Models {
    public class OrderDetail {
        [Required]
        public int Id { get; set; }

        [Required]
        public int OrderId { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public double Cost { get; set; }

        public virtual Order Order { get; set; }
    }
}