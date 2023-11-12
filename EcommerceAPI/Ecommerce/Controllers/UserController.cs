using EcommerceModels;
using EcommerceModels.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using System.Text;
using EcommerceInterfaces;
using EcommerceInterfaces.Auth;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : GenericController<User>
    {
        private readonly EcommerceDbContext db;
        private readonly IUser _user;
        private readonly IAll<User> _all;

        private static RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();

        private static readonly int SaltSize = 16;
        private static readonly int HashSize = 20;
        private static readonly int Iterations = 10000;

        public UserController(EcommerceDbContext db, IUser user, IAll<User> allController) : base(allController)
        {
            this.db = db;
            this._user = user;
            this._all = allController;
        }


        [HttpPost]
        public async Task<IActionResult> AuthenticateUser([FromBody] User user)
        {
            try
            {
                var result = await _user.Authenticate(user);

                if (result)
                {
                    var userToLogin = await db.tblUser.FirstOrDefaultAsync(x => x.UserName == user.UserName);

                    if (userToLogin == null)
                        return NotFound(new { Message = "User Not Found !!" });

                    userToLogin.Token = CreateJWTToken(userToLogin);

                    return Ok(new
                    {
                        Message = "Login Success",
                        Token = userToLogin.Token
                    });
                }


                return BadRequest("Something went wrong");
            }
            catch (Exception)
            {

                throw;
            }

           
        }

        // ----------------------------- Authenticate

        //[HttpPost]
        //public async Task<IActionResult> AuthenticateUser(User user)
        //{
        //    try
        //    {
        //        var result = await _user.Authenticate(user);
        //        if (result)
        //        {

        //            var userToLogin = await db.tblUser.FirstOrDefaultAsync(x => x.UserName == user.UserName);

        //            if (userToLogin == null)
        //                return NotFound(new { Message = "User Not Found !!" });



        //            userToLogin.Token = CreateJWTToken(userToLogin);

        //            return Ok(new
        //            {
        //                Message = "Login Success",
        //                Token = userToLogin.Token
        //            });



        //        }
        //        return NotFound("Id Not Found");
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        private string CreateJWTToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("supersecret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role , user.Role),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                //Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }


        //public UserController(EcommerceDbContext db, IAll<User> allController, IStoreProcedures<User> storeProcedures, IAll<User> all, IUser user) : base(allController, storeProcedures, all)
        //{
        //    this.db = db;
        //    _user = user;
        //}













        [HttpPost]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            try
            {
                var result = await _user.Register(user);

                if (result)
                {
                    await _all.CompleteAsync();

                    return Ok(new
                    {
                        Message = $"{user.UserName} Registered Successfully..."
                    });
                }

                return Ok(new
                {
                    Message = "Something went wrong"
                }); 

            }
            catch (Exception)
            {
                throw;
            }
                      
        }

    
       
    }
}
