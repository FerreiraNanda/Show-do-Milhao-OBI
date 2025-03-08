namespace ShowDoMilhaoOBI.Domain.Entities
{
    public class BaseEntity
    {
        public int Id { get; set; } = new Random().Next();
        public DateTime CretedOn { get; set; } = DateTime.UtcNow;
    }
}
