using JinJiWeb.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JinJiWeb.Data {
    public class AppDbContext : IdentityDbContext {

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) {
        }
        public DbSet<Product> Products { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderDetail> OrderDetails { get; set; }

        public DbSet<Consumable> Consumables { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) {
            foreach (IMutableEntityType entity in builder.Model.GetEntityTypes()) {
                entity.Relational().TableName = entity.DisplayName();
            }

            foreach (var relationship in builder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys())) {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            base.OnModelCreating(builder);


            builder.Entity<OrderDetail>(b => {
                b.HasOne(od => od.Order).WithMany(o => o.OrderDetails).HasForeignKey(od => od.OrderId).OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
