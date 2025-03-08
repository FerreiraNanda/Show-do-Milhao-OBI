using ShowDoMilhaoOBI.Domain.Entities;
using ShowDoMilhaoOBI.DTOs;

namespace ShowDoMilhaoOBI.Domain.Repositories
{
    public interface IUserRepository
    {
        public Task<Response> Add(User user);
        public Task<Response> Update(User user);
        public Task<Response> Delete(int id);
        public Task<User?> GetById(int id);
        public Task<List<User>?> GetByRank();
        public Task<User?> GetByEmailAndPassword(string email, string password);
        public Task<Response> UpdateAmount(int id, int amount);
    }
}
