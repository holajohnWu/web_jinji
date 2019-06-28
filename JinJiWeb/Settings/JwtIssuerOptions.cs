using Microsoft.IdentityModel.Tokens;
using System;
using System.Threading.Tasks;

namespace JinJiWeb.Settings {
    public class JwtIssuerOptions {
        public string JwtSignInKey { get; set; }

        public string Issuer { get; set; }

        public string Audience { get; set; }

        public int ValidFor { get; set; }
    }
}
