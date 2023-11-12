using EcommerceInterfaces;
using EcommerceInterfaces.Auth;
using EcommerceModels;
using EcommerceModels.Auth;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace EcommerceRepositories
{
    public class GenericRepo<T> : IAll<T>,IStoreProcedures<T> where T : class
    {
        public EcommerceDbContext dbContext = default!;
        internal DbSet<T> dbSet = default!;


        public GenericRepo(EcommerceDbContext dbContext)
        {
            this.dbContext = dbContext;
            this.dbSet = this.dbContext.Set<T>();
        }


        // --------------------------------- NORMAL
        // Get All Informations
        public virtual Task<List<T>> GetAll()
        {
            return this.dbSet.ToListAsync();
        }



        // -- Get Informations By ID
        public virtual Task<T> GetById(int id)
        {
            throw new NotImplementedException();
        }


        // -- Get Informations By Name
        public virtual Task<T> GetByName(string name)
        {
            throw new NotImplementedException();
        }

        // ---------------------------- GET END 
        // --------------------------------------- INSERT START



        // ----------------------- NORMAL
        public virtual Task Insert(T entity)
        {
            throw new NotImplementedException();

        }

        public virtual Task InsertRange(IEnumerable<T> entities)
        {
            throw new NotImplementedException();

        }

        // -------------------------------- WITH STORE PROCEDURE

        //public virtual Task<bool> CreateWithSP(T entity)
        //{
        //    throw new NotImplementedException();
        //}





        // -------------------------------- INSERT END
        // -------------------------------------------------UPDATE START


        // ----------------------------- NORMAL
        public virtual Task<bool> Update(T entity)
        {
            throw new NotImplementedException();
        }

        //public virtual Task<bool> UpdateWithSP(T entity)
        //{
        //    throw new NotImplementedException();
        //}




        // ---------------------------------- UPDATE END
        // -------------------------------------------------- DELETE START

        // ---------------------------NORMAL
        public virtual Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }


        // ------------------------------------- WITH STORE PROCEDURE
        //public virtual Task<bool> DeleteWithSP(int id)
        //{
        //    throw new NotImplementedException();
        //}


        public async Task CompleteAsync()
        {
            await dbContext.SaveChangesAsync();
        }







        public Task<bool> CreateWithSP(T entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateWithSP(T entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteWithSP(int id)
        {
            throw new NotImplementedException();
        }
    }
}
