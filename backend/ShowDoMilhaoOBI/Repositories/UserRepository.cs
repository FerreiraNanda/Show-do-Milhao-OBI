using Microsoft.EntityFrameworkCore;
using ShowDoMilhaoOBI.Context;
using ShowDoMilhaoOBI.Domain.Entities;
using ShowDoMilhaoOBI.Domain.Repositories;
using ShowDoMilhaoOBI.DTOs;

namespace ShowDoMilhaoOBI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Response> Add(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return new Response(true, "User add with sucess");
        }

        public async Task<Response> Delete(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user is null) return new Response(false, "User not found");

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return new Response(true, "User removed with success");
        }

        public async Task<User?> GetByEmailAndPassword(string email, string password)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email.Equals(email)
                && u.Password.Equals(password));
            
            if(user is null) return null;
            return user;
        }

        public async Task<User?> GetById(int id)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(_ => _.Id.Equals(id));
            if (user is null) return null;
            return user;
        }

        public async Task<List<User>?> GetByRank()
        {
            var users = await _context.Users.OrderByDescending(u => u.Amount).ToListAsync();
            if(users.Count != 0) return users;
            return null;
        }

        public async Task<Response> Update(User user)
        {
            var oldUser = await _context.Users.FirstOrDefaultAsync(u => u.Id.Equals(user.Id));
            if (oldUser is null) return new Response(false, "User not found");

            oldUser.Name = user.Name;
            oldUser.Email = user.Email;
            _context.Users.Update(oldUser);
            await _context.SaveChangesAsync();

            return new Response(true, "Users is updated with success");
        }

        public async Task<Response> UpdateAmount(int id, int amount)
        {
            var oldUser = await GetById(id);
            if (oldUser is null) return new Response(false, "user not found");

            oldUser.Amount += amount;
            _context.Users.Update(oldUser);
            await _context.SaveChangesAsync();
            return new Response(true, "User amount is ben updated");
        }
    }
}
