using System.ComponentModel.DataAnnotations;

namespace ShowDoMilhaoOBI.DTOs
{
    public class LoginDTO
    {
        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MaxLength(50)]
        public string Password { get; set; }
    }
}
