using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using JinJiWeb.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using JinJiWeb.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using JinJiWeb.Extensions;
using Microsoft.AspNetCore.Identity;

namespace JinJiWeb {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddSpaStaticFiles(configuration => {
                configuration.RootPath = "ClientSite/dist";
            });

            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

            // setting db context
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddMvc(config => {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                config.Filters.Add(new AuthorizeFilter(policy));
            });

            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<JwtIssuerOptions>(Configuration.GetSection(nameof(JwtIssuerOptions)));

            // jwt 設定
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));
            var key = Encoding.ASCII.GetBytes(jwtAppSettingOptions[nameof(JwtIssuerOptions.JwtSignInKey)]);

            var tokenValidationParameters = new TokenValidationParameters {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            // 設定 jwt身分驗證
            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(configureOptions => {
                configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
            });

            // 加入 xxs 防護
            services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseHsts();
            }

            //apply any pending migrations, and will create database if not exist
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope()) {
                serviceScope.ServiceProvider.GetService<AppDbContext>().Database.Migrate();
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseAuthentication();
            app.EnsureRolesCreated();
            app.UseHttpsRedirection();
            app.UseMvc();

            app.UseSpa(spa => {
                spa.Options.SourcePath = "ClientSite";

                if (env.IsDevelopment()) {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
