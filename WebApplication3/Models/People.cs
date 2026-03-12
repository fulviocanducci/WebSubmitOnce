using Microsoft.EntityFrameworkCore;

namespace WebApplication3.Models
{
    public class People
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
    }

    public class DataContext: DbContext
    {
        protected DataContext()
        {
        }

        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<People> People { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<People>(x =>
            {
                x.HasKey(c => c.Id);
                x.Property(c => c.Id).ValueGeneratedOnAdd();
                x.Property(c => c.Name).HasMaxLength(100).IsRequired();
            });
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("DatabaseInMemory");
        }
    }
}
