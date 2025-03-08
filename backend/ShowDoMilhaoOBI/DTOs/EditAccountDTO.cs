using System.ComponentModel.DataAnnotations;

namespace ShowDoMilhaoOBI.DTOs
{
    public class EditAccountDTO
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } 
        [Required]
        [MaxLength(50)]
        public string Nickname { get; set; }
        [Required]
        [MaxLength(50)]
        [EmailAddress]
        public string Email { get; set; }
    }
}
