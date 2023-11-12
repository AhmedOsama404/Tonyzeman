using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using EcommerceModels.Auth;

namespace EcommerceModels.MasterDetails
{
    
    public class Customer
    {
        public int CustomerID { get; set; }
        [Required, StringLength(50), Display(Name = "Customer Name")]
        public string CustomerName { get; set; } = default!;
        [Required, StringLength(150)]
        public string Address { get; set; } = default!;
        [Required, StringLength(50)]
        public string Email { get; set; } = default!;
    }
   

   

    public class Product
    {
        public int ProductID { get; set; }


        [Required, StringLength(50), Display(Name = "Product Name")]
        public string ProductName { get; set; } = default!;
        

        public string? Description { get; set; } = default!;


        public string? CategoryName { get; set; }


        [Required, Column(TypeName = "money"), DisplayFormat(DataFormatString = "{0:0.00}")]
        public decimal Price { get; set; }
        

        public decimal SellPrice { get; set; }


        public string Picture { get; set; } = default!;

        public bool IsAvailable { get; set; }
        public  Order id { get; set; }
        public Order Order {  get; set; } 
    }
    public class Order
    {

        public int OrderId { get; set; }
        [Required, StringLength(50), Display(Name = "Product Name")]

        public decimal Price { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }
        List <Product> Products { get; set; } 
    } 
    

}
