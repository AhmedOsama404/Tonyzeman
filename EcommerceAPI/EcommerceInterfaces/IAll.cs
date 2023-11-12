using EcommerceInterfaces.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EcommerceInterfaces
{
    public interface IAll<T>: IGet<T>, IInsert<T>, IUpdate<T>, IDelete<T>,ISave<T>, IStoreProcedures<T> where T:class
    {

    }
}
