using ShowDoMilhaoOBI.Domain.Entities;
using ShowDoMilhaoOBI.DTOs;

namespace ShowDoMilhaoOBI.Domain.Repositories
{
    public interface IGameRepository
    {
        public Task<Response> Add(Game game);
        public Task<List<Game>?> GetAll(int id);
    }
}
