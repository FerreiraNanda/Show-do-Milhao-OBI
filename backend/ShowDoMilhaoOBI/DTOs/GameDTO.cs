using System.ComponentModel.DataAnnotations;

namespace ShowDoMilhaoOBI.DTOs
{
    public class GameDTO
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int Amount { get; set; }
    }
}
