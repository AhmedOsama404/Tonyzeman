using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EcommerceInterfaces
{
    public interface IGet<T> where T : class
    {
        Task<List<T>> GetAll();

        Task<T> GetById(int id);

        Task<T> GetByName(string name);
    }
}
