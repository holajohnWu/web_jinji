using System.ComponentModel.DataAnnotations;

namespace JinJiWeb.Models {
    public class Product {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public double Cost { get; set; }
    }
}