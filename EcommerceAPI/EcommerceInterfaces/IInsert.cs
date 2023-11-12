using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EcommerceInterfaces
{
    public interface IInsert<T> where T : class
    {
        Task Insert(T entity);

        Task InsertRange(IEnumerable<T> entities);



        // --------------------- Store Procedures
        //Task<bool> CreateWithSP(T entity);
    }
}
