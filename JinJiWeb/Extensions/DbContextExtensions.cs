using JinJiWeb.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace JinJiWeb.Extensions {
    public static class DbContextExtensions {
        public static bool AllMigrationsApplied(this AppDbContext context) {
            var applied = context.GetService<IHistoryRepository>()
                .GetAppliedMigrations()
                .Select(m => m.MigrationId);

            var total = context.GetService<IMigrationsAssembly>()
                .Migrations
                .Select(m => m.Key);

            return !total.Except(applied).Any();
        }

        public static void EnsureRolesCreated(this IApplicationBuilder app) {
            var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var context = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>();
            var env = serviceScope.ServiceProvider.GetService<IHostingEnvironment>();

            if (!context.AllMigrationsApplied()) {
                throw new Exception("Migrations do not all applied in development mode");
            }

            var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

            // create admin user
            var adminUser = userManager.FindByNameAsync("wuhome157").Result;
            if (adminUser == null) {
                adminUser = new IdentityUser() {
                    UserName = "Wuhome157",
                    SecurityStamp = "1qaz@WSX"
                };

                var result = userManager.CreateAsync(adminUser, "Wu12345678@").Result;
                result = userManager.SetLockoutEnabledAsync(adminUser, false).Result;
            }
        }
    }
}
