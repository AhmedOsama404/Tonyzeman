using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EcommerceInterfaces
{
    public interface ISave<T> where T : class
    {
        Task CompleteAsync();
    }
}
