using Microsoft.EntityFrameworkCore;
using ShowDoMilhaoOBI.Domain.Entities;

namespace ShowDoMilhaoOBI.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }
        public DbSet<User> Users { get; set; } 
        public DbSet<Question> Questions { get; set; }
        public DbSet<Game> Games { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }
    }
}
