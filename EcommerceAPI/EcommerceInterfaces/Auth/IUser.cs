using EcommerceModels.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EcommerceInterfaces.Auth
{
    public interface IUser
    {

        Task<bool> Register(User entity);

        Task<bool> Authenticate(User entity);
    }
}
