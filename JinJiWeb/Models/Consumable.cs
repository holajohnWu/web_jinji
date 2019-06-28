using JinJiWeb.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace JinJiWeb.Models {
    public class Consumable {
        [Required]
        public int Id { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        public int Month { get; set; }

        [Required]
        public int Day { get; set; }

        [Required]
        public ConsumableType Type { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public double Cost { get; set; }
    }
}