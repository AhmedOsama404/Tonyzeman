using EcommerceModels.Auth;
using EcommerceModels.MasterDetails;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace EcommerceModels
{
    public class EcommerceDbContext: IdentityDbContext<ApplicationUser>
    {
        public EcommerceDbContext(DbContextOptions<EcommerceDbContext> options) : base(options)
        {

        }

        // Auth
        public DbSet<User> tblUser => Set<User>();
        public DbSet<Customer> Customers { get; set; } = default!;
        public DbSet<Product> Products { get; set; } = default!;
        public DbSet<Order> Orders { get; set; }= default!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Set up two users
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id= 1,
                    FirstName = "Admin",
                    LastName = ".",
                    UserName = "Admin",
                    Password = "Sasa123@",
                    Role = "admin",
                    Email = "ososusama2@gmail.com"
                },
                new User
                {
                    Id = 2,
                    FirstName = "User",
                    LastName = ".",
                    UserName = "User",
                    Password = "Sasa123@",
                    Role = "user",
                    Email = "sakib@gmail.com"
                });
        }
    }
}
