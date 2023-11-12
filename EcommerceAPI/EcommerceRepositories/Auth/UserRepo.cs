using EcommerceInterfaces;
using EcommerceInterfaces.Auth;
using EcommerceModels;
using EcommerceModels.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace EcommerceRepositories.Auth
{
    public class UserRepo : GenericRepo<User>,IAll<User>,IUser
    {
        private static RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();

        private static readonly int SaltSize = 16;
        private static readonly int HashSize = 20;
        private static readonly int Iterations = 10000;


        public UserRepo(EcommerceDbContext dbContext) : base(dbContext)
        {
        }


        // -- Get All
        public override Task<List<User>> GetAll()
        {
            try
            {
                return base.GetAll();
            }
            catch (Exception)
            {
                throw;
            }
        }



        // -- Get By ID
        public override async Task<User> GetById(int id)
        {
            try
            {
                var user = await dbSet.FirstOrDefaultAsync(item => item.Id == id);
                return user;
            }
            catch (Exception)
            {
                throw;
            }
        }


        // -- GET BY NAME
        public override async Task<User> GetByName(string name)
        {
            try
            {
                var user = await dbSet.FirstOrDefaultAsync(item => item.UserName == name || item.UserName.StartsWith(name) || item.UserName.EndsWith(name) || item.UserName.ToLower().StartsWith(name.ToLower()) || item.UserName.ToLower().EndsWith(name.ToLower()) || item.UserName.ToLower().Equals(name.ToLower()));
                return user;
            }
            catch (Exception)
            {
                throw;
            }
        }



        // -------------------------- INSERT
        public override async Task Insert(User entity)
        {
            await dbSet.AddAsync(entity);
        }

        // ------------------------------ INSERT RANGE

        public override async Task InsertRange(IEnumerable<User> entities)
        {
            await dbSet.AddRangeAsync(entities);
        }


        // ---------------------------- UPDATE
        public override async Task<bool> Update(User entity)
        {
            try
            {
                var existdata = await dbSet.FirstOrDefaultAsync(item => item.Id == entity.Id);

                if (existdata != null)
                {
                    existdata.FirstName = entity.FirstName;
                    existdata.LastName = entity.LastName;
                    existdata.Email = entity.Email;
                    existdata.UserName = entity.UserName;
                    existdata.Password = entity.Password;
                  
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception)
            {
                throw;
            }
        }



        // ----------------------------------- DELETE
        public override async Task<bool> Delete(int id)
        {
            var existdata = await dbSet.FirstOrDefaultAsync(item => item.Id == id);
            if (existdata != null)
            {
                dbSet.Remove(existdata);
                return true;
            }
            else
            {
                return false;
            }
        }

       
        // Hash password
        public static string HashPassword(string password)
        {
            byte[] salt;
            rng.GetBytes(salt = new byte[SaltSize]);
            var key = new Rfc2898DeriveBytes(password, salt, Iterations);
            var hash = key.GetBytes(HashSize);

            var hashBytes = new byte[SaltSize + HashSize];
            Array.Copy(salt, 0, hashBytes, 0, SaltSize);
            Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

            var base64Hash = Convert.ToBase64String(hashBytes);
            return base64Hash;
        }

       
        private async Task<bool> IsUsernameExists(string username)
        {
            return await dbContext.tblUser.AnyAsync(x => x.UserName == username);
        }

        private async Task<bool> IsEmailExists(string email)
        {
            return await dbContext.tblUser.AnyAsync(x => x.Email == email);
        }

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
                sb.Append("Password must carry atleast 8 characters" + Environment.NewLine);

            if (!(Regex.IsMatch(password, "[a-z]")))
                sb.Append("Password must contain atleast one lowercase character" + Environment.NewLine);

            if (!(Regex.IsMatch(password, "[A-Z]")))
                sb.Append("Password must contain atleast one uppercase character" + Environment.NewLine);

            if (!(Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password must contain atleast one numeric character" + Environment.NewLine);

            if (!(Regex.IsMatch(password, "[<,>,!,@,#,$,%,^,&,*,(,),{,},\\[,\\],\\,/,.,',\",`,_]")))
                sb.Append("Password must contain atleast one special character" + Environment.NewLine);

            return sb.ToString();
        }

        public async Task<bool> Register(User entity)
        {
            try
            {

                if (entity == null)
                    return false;

                // check username not to duplicate
                if (await IsUsernameExists(entity.UserName))
                    return false;

                // check email not to duplicate
                if (await IsEmailExists(entity.Email))
                    return false;

                // check password to be strong

                string passwordStrength = CheckPasswordStrength(entity.Password);
                if (!string.IsNullOrEmpty(passwordStrength))
                    return false;

                else
                {
                    var hashedPassword = HashPassword(entity.Password);

                    entity.Password = hashedPassword;
                    entity.Role = "user";
                    entity.Token = string.Empty;
                    await dbContext.tblUser.AddAsync(entity);

                    return true;
                }
            }
            catch (Exception)
            {

                throw;
            }
          
        }



        //Verify Password

        public static bool VerifyPassword(string password, string base64Hash)
        {
            var hashBytes = Convert.FromBase64String(base64Hash);

            var salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);

            var key = new Rfc2898DeriveBytes(password, salt, Iterations);
            byte[] hash = key.GetBytes(HashSize);

            for (var i = 0; i < HashSize; i++)
            {
                if (hashBytes[i + SaltSize] != hash[i])
                    return false;
            }
            return true;
        }


        //private string CreateJWTToken(User user)
        //{
        //    var jwtTokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes("supersecret.....");
        //    var identity = new ClaimsIdentity(new Claim[]
        //    {
        //        new Claim(ClaimTypes.Role , user.Role),
        //        new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
        //    });

        //    var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = identity,
        //        Expires = DateTime.Now.AddDays(1),
        //        //Expires = DateTime.Now.AddSeconds(10),
        //        SigningCredentials = credentials
        //    };
        //    var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        //    return jwtTokenHandler.WriteToken(token);
        //}

        public async Task<bool> Authenticate(User entity)
        {
            try
            {
                if (entity == null)
                    return false;

                var existdata = await dbSet.FirstOrDefaultAsync(item => item.UserName == entity.UserName && item.Password == entity.Password);

                if (existdata != null)
                {
                    existdata.UserName = entity.UserName;
                    existdata.Password = entity.Password;

                    return true;
                }
                else
                {
                    var userToLogin = await dbContext.tblUser.FirstOrDefaultAsync(x => x.UserName == entity.UserName);

                    if (userToLogin == null)
                        return false;

                    bool isPassVerified = VerifyPassword(entity.Password, userToLogin.Password);

                    //userToLogin.Token = CreateJWTToken(userToLogin);

                    return true;
                }

                return false;

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
