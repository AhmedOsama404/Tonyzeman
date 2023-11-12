using EcommerceInterfaces;
using EcommerceInterfaces.Auth;
using EcommerceModels.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class GenericController<T> : Controller where T : class
    {
        private readonly IAll<T> _allController;
        //private readonly IUser _user;
      

        public GenericController(
                            IAll<T> allController)
        {
            this._allController = allController;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var data = await _allController.GetAll();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var data = await _allController.GetById(id);
                if (data == null)
                {
                    return NotFound($"Sorry!!! ID: {id} Not Exists");
                }
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpGet("{name}/Search")]
        public async Task<IActionResult> GetByName(string name)
        {
            try
            {
                var data = await _allController.GetByName(name);
                if (data == null)
                {
                    return NotFound($"Sorry!!! Name: {name} Not Exists");
                }
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // ------------------------------- Insert

        [HttpPost("Insert")]
        public async Task<IActionResult> Insert(T entity)
        {
            try
            {
                await _allController.Insert(entity);
                await _allController.CompleteAsync();
                return Ok(entity);
            }
            catch (Exception)
            {
                throw;
            }

        }



        // ------------------------------- Insert Range

        [HttpPost("InsertRange")]
        public async Task<IActionResult> InsertRange(T[] entities)
        {
            try
            {
                await _allController.InsertRange(entities);
                await _allController.CompleteAsync();
                return Ok(entities);
            }
            catch (Exception)
            {
                throw;
            }
        }




        //// ----------------------------- UPDATE
        ///
        [HttpPut("Update")]
        public async Task<IActionResult> Update(T entity)
        {
            try
            {
                var result = await _allController.Update(entity);
                if (result)
                {
                    await _allController.CompleteAsync();
                    return Ok(entity);
                }
                return NotFound("Id Not Found");
            }
            catch (Exception)
            {
                throw;
            }
        }



        // --------------------------- Delete

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(int id)
        {
            try
            {
                var data = await _allController.GetById(id);
                if (data == null)
                {
                    return NotFound($"ID: {id} Not Exists");
                }
                await _allController.Delete(id);
                await _allController.CompleteAsync();
                return Ok($"{id} Deleted Successfully");
            }
            catch (Exception)
            {
                throw;
            }
        }













        ////// ----------------------------- Authenticate
        /////
        //[HttpPost]
        //public async Task<IActionResult> AuthenticateUser(User user)
        //{
        //    try
        //    {
        //        var result = await _user.Authenticate(user);
        //        if (result)
        //        {
        //            await _allController.CompleteAsync();
        //            return Ok(new
        //            {
        //                Message = "Login Success",
        //                //Token = userToLogin.Token
        //            });
        //        }
        //        return NotFound("Id Not Found");
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


    }
}