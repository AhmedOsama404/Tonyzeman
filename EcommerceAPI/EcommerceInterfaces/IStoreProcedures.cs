using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EcommerceInterfaces
{
    public interface IStoreProcedures<T> where T : class
    {
        Task<bool> CreateWithSP(T entity);

        Task<bool> UpdateWithSP(T entity);

        Task<bool> DeleteWithSP(int id);
    }
}
