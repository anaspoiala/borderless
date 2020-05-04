using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Borderless.ServiceLayer.Helpers
{
    public class JwtTokenHelper
    {
        private const string SECRET_KEY = "VeRy sEcReT AnD SeCuRe kEy :)";

        public static string CreateToken(Guid userId)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(SECRET_KEY));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var token = jwtTokenHandler.CreateJwtSecurityToken(
                subject: new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId.ToString())
                }),
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: signingCredentials
            );

            string tokenString = jwtTokenHandler.WriteToken(token);

            return tokenString;
        }

        public static ClaimsPrincipal ReadAndValidateToken(string token)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(SECRET_KEY));
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateLifetime = true,
                LifetimeValidator = ValidateLifetime,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = securityKey
            };

            return jwtTokenHandler.ValidateToken(token, tokenValidationParameters, out _);
        }

        private static bool ValidateLifetime(
            DateTime? notBefore,
            DateTime? expires,
            SecurityToken securityToken,
            TokenValidationParameters validationParameters)
        {
            if (expires == null)
                return false;

            return DateTime.UtcNow < expires;
        }
    }
}