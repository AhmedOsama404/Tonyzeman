using AutoMapper;
using EcommerceModels;
using EcommerceModels.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IMapper mapper;
        private readonly IConfiguration configuration;

        public AccountController(UserManager<ApplicationUser> userManager, IMapper mapper, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.mapper = mapper;
            this.configuration = configuration;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterDTO userDTO)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser applicationUser = mapper.Map<ApplicationUser>(userDTO);


                IdentityResult result = await userManager.CreateAsync(applicationUser);

                if (result.Succeeded)
                {
                    return Ok("User Is Creted Succefully");
                }
                else
                {
                    var resultErrors = new List<string>();
                    foreach (var erorr in result.Errors)
                    {
                        resultErrors.Add(erorr.Description);
                    }
                    return BadRequest(resultErrors);
                }
            }
            else
                return BadRequest(ModelState);
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDTO userDTO)
        {

            if (!ModelState.IsValid)
            {
                // Invalid model state, return Unauthorized
                return Unauthorized("Invalid model state");
            }

            // Find the user by their username
            ApplicationUser user = await userManager.FindByNameAsync(userDTO.UserName);

            if (user == null)
            {
                // User not found, return Unauthorized
                return Unauthorized("User not found");
            }

            // Check the password
            bool userIsFound = await userManager.CheckPasswordAsync(user, userDTO.Password);

            if (!userIsFound)
            {
                // Invalid password, return Unauthorized
                return Unauthorized("Invalid password");
            }

            // Get JWT settings from appsettings.json
            var jwtKey = configuration["JwtSettings:Key"];
            var jwtIssuer = configuration["JwtSettings:Issuer"];
            var jwtAudience = configuration["JwtSettings:Audience"];

            // Create claims for the user
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

            // Get user roles
            var userRoles = await userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            // Create a Security Key
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

            // Create Signing Credentials
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Create the JWT token
            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: signingCredentials
            );

            // Return a successful response with the JWT token
            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expire = token.ValidTo
            });



        }
    }
}
