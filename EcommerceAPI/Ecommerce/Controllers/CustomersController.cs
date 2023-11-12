using EcommerceInterfaces;
using EcommerceModels.MasterDetails;
using EcommerceModels.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {

        IUnitOfWork unitOfWork;
        IGenericRepo<Customer> repo;
        public CustomersController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repo = this.unitOfWork.GetRepo<Customer>();
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<CustomerViewModel>>> GetCustomerViewModels()
        {
            var data = await this.repo.GetAllAsync();
            return data.Select(c => new CustomerViewModel
            {
                CustomerID = c.CustomerID,
                CustomerName = c.CustomerName,
                Address = c.Address,
                Email = c.Email,
                CanDelete = true

            }).ToList();
        }
        /// <summary>
        /// to get all customers with order entries
        /////////////////////////////////////////////
        [HttpGet("WithOrders")]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomerWithOrders()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }
        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await this.repo.GetAsync(c => c.CustomerID == id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }
        /// <summary>
        /// to get single customer with order entries
        /////////////////////////////////////////////
        [HttpGet("{id}/WithOrders")]
        public async Task<ActionResult<Customer>> GetCustomerWithOrders(int id)
        {
            var customer = await this.repo.GetAsync(c => c.CustomerID == id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }
        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.CustomerID)
            {
                return BadRequest();
            }

            await this.repo.UpdateAsync(customer);

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

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            await this.repo.AddAsync(customer);
            await unitOfWork.CompleteAsync();

            return customer;
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await repo.GetAsync(c => c.CustomerID == id);
            if (customer == null)
            {
                return NotFound();
            }

            await this.repo.DeleteAsync(customer);
            await unitOfWork.CompleteAsync();

            return NoContent();
        }
    }
}
