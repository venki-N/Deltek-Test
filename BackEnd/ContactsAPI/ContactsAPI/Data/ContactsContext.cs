using Microsoft.EntityFrameworkCore;
using ContactsAPI.Models;

namespace Memory.Data
{
    public class ContactsContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        public ContactsContext(DbContextOptions<ContactsContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasData(
                    new Contact { Id = 1, FirstName = "John", LastName = "Doe", Email = "john@example.com", PhoneNumber = "1234567890" },
                    new Contact { Id = 2, FirstName = "Jane", LastName = "Smith", Email = "jane@example.com", PhoneNumber = "9876543210" },
                    new Contact { Id = 3, FirstName = "Alice", LastName = "Johnson", Email = "alice@example.com", PhoneNumber = "5555555555" },
                    new Contact { Id = 4, FirstName = "Bob", LastName = "Williams", Email = "bob@example.com", PhoneNumber = "4444444444" },
                    new Contact { Id = 5, FirstName = "Emily", LastName = "Brown", Email = "emily@example.com", PhoneNumber = "3333333333" },
                    new Contact { Id = 6, FirstName = "Michael", LastName = "Jones", Email = "michael@example.com", PhoneNumber = "2222222222" },
                    new Contact { Id = 7, FirstName = "Samantha", LastName = "Taylor", Email = "samantha@example.com", PhoneNumber = "1111111111" },
                    new Contact { Id = 8, FirstName = "David", LastName = "Martinez", Email = "david@example.com", PhoneNumber = "6666666666" },
                    new Contact { Id = 9, FirstName = "Olivia", LastName = "Garcia", Email = "olivia@example.com", PhoneNumber = "7777777777" },
                    new Contact { Id = 10, FirstName = "William", LastName = "Hernandez", Email = "william@example.com", PhoneNumber = "8888888888" }
                );
            });
        }
    }
}
