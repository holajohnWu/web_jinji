using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JinJiWeb.Models.ViewModels;
using JinJiWeb.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace JinJiWeb.Controllers {
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    [AllowAnonymous]
    public class AccountController : ControllerBase {

        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly JwtIssuerOptions _jwtOptions;

        public AccountController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IOptions<JwtIssuerOptions> jwtOptions) {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtOptions = jwtOptions.Value;
        }

        // POST: api/Account/Login
        [HttpPost("Login")]
        public async Task<ActionResult<string>> Login([FromBody] AccountViewModel model) {
            var user = await _userManager.FindByNameAsync(model.Account);

            if (user == null) {
                return NotFound();
            }

            // user sign in
            var result = await _signInManager.PasswordSignInAsync(model.Account, model.Password, false, false);

            if (result.Succeeded) {
                var key = Encoding.ASCII.GetBytes(_jwtOptions.JwtSignInKey);

                // Create the JWT and write it to a string
                var jwt = new JwtSecurityToken(
                    issuer: _jwtOptions.Issuer,
                    audience: _jwtOptions.Audience,
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature));

                return Ok(new JwtSecurityTokenHandler().WriteToken(jwt));
            }

            return BadRequest();
        }
    }
}
