using EcommerceModels.MasterDetails;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EcommerceModels.HostedService
{
    public class DbSeederHostedService : IHostedService
    {

        IServiceProvider serviceProvider;
        public DbSeederHostedService(
            IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;

        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using (IServiceScope scope = serviceProvider.CreateScope())
            {

                var db = scope.ServiceProvider.GetRequiredService<EcommerceDbContext>();

                await SeedDbAsync(db);

            }
        }
        public async Task SeedDbAsync(EcommerceDbContext db)
        {
            await db.Database.EnsureCreatedAsync();
            if (!db.Customers.Any())
            {
                var c1 = new Customer { CustomerName = "Runa", Email = "runa@gmail.com", Address = "Gaibandha, Bangladesh" };
                await db.Customers.AddAsync(c1);
                var c2 = new Customer { CustomerName = "Lily", Email = "lily@gmail.com", Address = "Gaibandha, Bangladesh" };
                await db.Customers.AddAsync(c2);


                var p1 = new Product { ProductName = "T-Shirt", Description="T-Shirt", CategoryName="Mens", IsAvailable = true, Price = 500M, SellPrice=600M, Picture = "t-shirt.png" };
                await db.Products.AddAsync(p1);

                var p2 = new Product { ProductName = "Armani Shirt", Description="Armani Shirt", CategoryName="Mens", IsAvailable = true, Price = 900M, SellPrice=1100M, Picture = "Shirt.png" };
                await db.Products.AddAsync(p2);

                var p3 = new Product { ProductName = "Dress Shirt", Description = "Dress Shirt", CategoryName = "Mens", IsAvailable = true, Price = 1000M, SellPrice = 1300M, Picture = "shirt2.png" };
                await db.Products.AddAsync(p3);

                var p4 = new Product { ProductName = "Baby T-Shirt", Description = "Baby T-Shirt", CategoryName = "Baby", IsAvailable = true, Price = 600M, SellPrice = 900M, Picture = "baby-t-shirt.png" };
                await db.Products.AddAsync(p4);

                var p5 = new Product { ProductName = "Ladies T-Shirt", Description = "Ladies T-Shirt", CategoryName = "Womens", IsAvailable = true, Price = 550M, SellPrice = 950M, Picture = "ladies-t-shirt.png" };
                await db.Products.AddAsync(p5);

                var p6 = new Product { ProductName = "Baby Frock", Description = "Baby Frock", CategoryName = "Baby", IsAvailable = true, Price = 450M, SellPrice = 700M, Picture = "baby-frock.png" };
                await db.Products.AddAsync(p6);

                var p7 = new Product { ProductName = "Three Piece", Description = "Three Piece", CategoryName = "Womens", IsAvailable = true, Price = 1450M, SellPrice = 3000M, Picture = "3pics.png" };
                await db.Products.AddAsync(p7);

                var p8 = new Product { ProductName = "Sharee", Description = "Sharee", CategoryName = "Womens", IsAvailable = true, Price = 2000M, SellPrice = 7000M, Picture = "sharee.png" };
                await db.Products.AddAsync(p8);

                var p9 = new Product { ProductName = "Football", Description = "Football", CategoryName = "Sports", IsAvailable = true, Price = 400M, SellPrice = 1000M, Picture = "football.png" };
                await db.Products.AddAsync(p9);

                await db.SaveChangesAsync();
            }

        }
        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

    }
}