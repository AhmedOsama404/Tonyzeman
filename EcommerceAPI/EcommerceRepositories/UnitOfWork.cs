using EcommerceInterfaces;
using EcommerceModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EcommerceRepositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        EcommerceDbContext db;
        public UnitOfWork(EcommerceDbContext db)
        {
            this.db = db;
        }
        public async Task CompleteAsync()
        {
            await db.SaveChangesAsync();
        }

        public void Dispose()
        {
            this.db.Dispose();
        }

        public IGenericRepo<T> GetRepo<T>() where T : class, new()
        {
            return new GenericRepository<T>(this.db);
        }
    }
}
