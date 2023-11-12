using EcommerceInterfaces;
using EcommerceModels.MasterDetails;
using EcommerceModels.ViewModels.Input;
using EcommerceModels.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private IWebHostEnvironment env;
        IUnitOfWork unitOfWork;
        IGenericRepo<Order> repo;
        public OrderController(IUnitOfWork unitOfWork, IWebHostEnvironment env)
        {
            this.unitOfWork = unitOfWork;
            this.repo = this.unitOfWork.GetRepo<Order>();
            this.env = env;
        }




        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var product = await this.repo.GetAsync(x => x.OrderId == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            await this.repo.UpdateAsync(order);

            try
            {
                await this.unitOfWork.CompleteAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;

            }

            return NoContent();
        }




        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            await this.repo.AddAsync(order);
            await this.unitOfWork.CompleteAsync();

            return order;
        }


        


      


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await this.repo.GetAsync(p => p.OrderId == id);
            if (order == null)
            {
                return NotFound();
            }

            await this.repo.DeleteAsync(order);
            await this.unitOfWork.CompleteAsync();

            return NoContent();
        }


    }

}

