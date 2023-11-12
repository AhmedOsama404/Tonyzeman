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
    public class ProductsController : ControllerBase
    {

        private IWebHostEnvironment env;
        IUnitOfWork unitOfWork;
        IGenericRepo<Product> repo;
        public ProductsController(IUnitOfWork unitOfWork, IWebHostEnvironment env)
        {
            this.unitOfWork = unitOfWork;
            this.repo = this.unitOfWork.GetRepo<Product>();
            this.env = env;
        }




        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }



        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<ProductViewModel>>> GetProductViewModels()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList().Select(p => new ProductViewModel
            {
                ProductID = p.ProductID,
                Price = p.Price,
                ProductName = p.ProductName,
                Description = p.Description,
                CategoryName = p.CategoryName,
                SellPrice = p.SellPrice,
                IsAvailable = p.IsAvailable,
                CanDelete = true,
                Picture = p.Picture

            }).ToList();
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await this.repo.GetAsync(x => x.ProductID == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductID)
            {
                return BadRequest();
            }

            await this.repo.UpdateAsync(product);

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



        [HttpPut("{id}/VM")]
        public async Task<IActionResult> PutProductViewModel(int id, ProductInputModel product)
        {
            if (id != product.ProductID)
            {
                return BadRequest();
            }

            var existing = await this.repo.GetAsync(p => p.ProductID == id);
            if (existing != null)
            {
                existing.ProductName = product.ProductName;
                existing.Description = product.Description;
                existing.CategoryName = product.CategoryName;
                existing.Price = product.Price;
                existing.SellPrice = product.SellPrice;
                existing.IsAvailable = product.IsAvailable;
                await this.repo.UpdateAsync(existing);
            }

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
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            await this.repo.AddAsync(product);
            await this.unitOfWork.CompleteAsync();

            return product;
        }


        [HttpPost("VM")]
        public async Task<ActionResult<Product>> PostProductInput(ProductInputModel product)
        {
            var newProduct = new Product
            {
                ProductName = product.ProductName,
                Description = product.Description,
                CategoryName = product.CategoryName,
                Price = product.Price,
                SellPrice = product.SellPrice,
                IsAvailable = product.IsAvailable,
                Picture = "no-product-image-400x400.png"
            };
            await this.repo.AddAsync(newProduct);
            await this.unitOfWork.CompleteAsync();

            return newProduct;
        }


        [HttpPost("Upload/{id}")]
        public async Task<ImagePathResponse> UploadPicture(int id, IFormFile picture)
        {
            var product = await this.repo.GetAsync(p => p.ProductID == id);
            var ext = Path.GetExtension(picture.FileName);
            string fileName = Guid.NewGuid() + ext;
            string savePath = Path.Combine(this.env.WebRootPath, "Pictures", fileName);
            FileStream fs = new FileStream(savePath, FileMode.Create);
            picture.CopyTo(fs);
            fs.Close();
            product.Picture = fileName;
            await this.repo.UpdateAsync(product);
            await this.unitOfWork.CompleteAsync();
            return new ImagePathResponse { PictureName = fileName };
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await this.repo.GetAsync(p => p.ProductID == id);
            if (product == null)
            {
                return NotFound();
            }

            await this.repo.DeleteAsync(product);
            await this.unitOfWork.CompleteAsync();

            return NoContent();
        }


    }
















    //[Route("api/[controller]")]
    //[ApiController]
    //public class ProductsController : ControllerBase
    //{

    //    private IWebHostEnvironment env;
    //    IUnitOfWork unitOfWork;
    //    IGenericRepo<Product> repo;
    //    public ProductsController(IUnitOfWork unitOfWork, IWebHostEnvironment env)
    //    {
    //        this.unitOfWork = unitOfWork;
    //        this.repo = this.unitOfWork.GetRepo<Product>();
    //        this.env = env;
    //    }

    //    // GET: api/Products
    //    [HttpGet]
    //    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    //    {
    //        var data = await this.repo.GetAllAsync();
    //        return data.ToList();
    //    }
    //    [HttpGet("VM")]
    //    public async Task<ActionResult<IEnumerable<ProductViewModel>>> GetProductViewModels()
    //    {
    //        var data = await this.repo.GetAllAsync(p => p.Include(x => x.OrderItems));
    //        return data.ToList().Select(p => new ProductViewModel
    //        {
    //            ProductID = p.ProductID,
    //            Price = p.Price,
    //            ProductName = p.ProductName,
    //            IsAvailable = p.IsAvailable,
    //            CanDelete = !p.OrderItems.Any(),
    //            Picture = p.Picture

    //        }).ToList();
    //    }
    //    // GET: api/Products/5
    //    [HttpGet("{id}")]
    //    public async Task<ActionResult<Product>> GetProduct(int id)
    //    {
    //        var product = await this.repo.GetAsync(x => x.ProductID == id);

    //        if (product == null)
    //        {
    //            return NotFound();
    //        }

    //        return product;
    //    }

    //    // PUT: api/Products/5
    //    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    //    [HttpPut("{id}")]
    //    public async Task<IActionResult> PutProduct(int id, Product product)
    //    {
    //        if (id != product.ProductID)
    //        {
    //            return BadRequest();
    //        }

    //        await this.repo.UpdateAsync(product);

    //        try
    //        {
    //            await this.unitOfWork.CompleteAsync();
    //        }
    //        catch (DbUpdateConcurrencyException)
    //        {

    //            throw;

    //        }

    //        return NoContent();
    //    }
    //    [HttpPut("{id}/VM")]
    //    public async Task<IActionResult> PutProductViewModel(int id, ProductInputModel product)
    //    {
    //        if (id != product.ProductID)
    //        {
    //            return BadRequest();
    //        }

    //        var existing = await this.repo.GetAsync(p => p.ProductID == id);
    //        if (existing != null)
    //        {
    //            existing.ProductName = product.ProductName;
    //            existing.Price = product.Price;
    //            existing.IsAvailable = product.IsAvailable;
    //            await this.repo.UpdateAsync(existing);
    //        }

    //        try
    //        {
    //            await this.unitOfWork.CompleteAsync();
    //        }
    //        catch (DbUpdateConcurrencyException)
    //        {

    //            throw;

    //        }

    //        return NoContent();
    //    }
    //    // POST: api/Products
    //    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    //    [HttpPost]
    //    public async Task<ActionResult<Product>> PostProduct(Product product)
    //    {
    //        await this.repo.AddAsync(product);
    //        await this.unitOfWork.CompleteAsync();

    //        return product;
    //    }
    //    /// <summary>
    //    // to insert product without image
    //    ///
    //    [HttpPost("VM")]
    //    public async Task<ActionResult<Product>> PostProductInput(ProductInputModel product)
    //    {
    //        var newProduct = new Product
    //        {
    //            ProductName = product.ProductName,
    //            Price = product.Price,
    //            IsAvailable = product.IsAvailable,
    //            Picture = "no-product-image-400x400.png"
    //        };
    //        await this.repo.AddAsync(newProduct);
    //        await this.unitOfWork.CompleteAsync();

    //        return newProduct;
    //    }
    //    [HttpPost("Upload/{id}")]
    //    public async Task<ImagePathResponse> UploadPicture(int id, IFormFile picture)
    //    {
    //        var product = await this.repo.GetAsync(p => p.ProductID == id);
    //        var ext = Path.GetExtension(picture.FileName);
    //        string fileName = Guid.NewGuid() + ext;
    //        string savePath = Path.Combine(this.env.WebRootPath, "Pictures", fileName);
    //        FileStream fs = new FileStream(savePath, FileMode.Create);
    //        picture.CopyTo(fs);
    //        fs.Close();
    //        product.Picture = fileName;
    //        await this.repo.UpdateAsync(product);
    //        await this.unitOfWork.CompleteAsync();
    //        return new ImagePathResponse { PictureName = fileName };
    //    }
    //    // DELETE: api/Products/5
    //    [HttpDelete("{id}")]
    //    public async Task<IActionResult> DeleteProduct(int id)
    //    {
    //        var product = await this.repo.GetAsync(p => p.ProductID == id);
    //        if (product == null)
    //        {
    //            return NotFound();
    //        }

    //        await this.repo.DeleteAsync(product);
    //        await this.unitOfWork.CompleteAsync();

    //        return NoContent();
    //    }


}






