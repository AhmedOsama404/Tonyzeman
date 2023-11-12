using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EcommerceModels.Auth
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        
        public string? FirstName { get; set; } = default!;
        public string? LastName { get; set; } = default!;


        [Required(ErrorMessage ="Username is Required")]
        [StringLength(20)]
        public string UserName { get; set; } = default!;


        [Required(ErrorMessage = "Password is Required")]
        public string Password { get; set; } = default!;


        public string? Token { get; set; }
        public string? Role { get; set; }
        public string? Email { get; set; } = default!;

    }
}
