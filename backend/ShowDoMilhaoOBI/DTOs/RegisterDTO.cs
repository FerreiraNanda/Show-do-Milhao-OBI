using System.ComponentModel.DataAnnotations;

namespace ShowDoMilhaoOBI.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [MaxLength(50)]
        public string Nickname { get; set; } = string.Empty;
        [Required]
        [MaxLength(100)]
        [EmailAddress]

        public string Email {  get; set; } = string.Empty;
        [Required]
        [MaxLength(50)]
        public string Password {  get; set; } = string.Empty;
    }
}
