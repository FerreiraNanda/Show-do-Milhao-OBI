using Microsoft.EntityFrameworkCore;
using ShowDoMilhaoOBI.Context;
using ShowDoMilhaoOBI.Domain.Entities;
using ShowDoMilhaoOBI.Domain.Repositories;
using ShowDoMilhaoOBI.DTOs;

namespace ShowDoMilhaoOBI.Repositories
{
    public class GameRepository : IGameRepository
    {
        private readonly AppDbContext _context;

        public GameRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Response> Add(Game game)
        {

            await _context.Games.AddAsync(game);
            await _context.SaveChangesAsync();
            return new Response(true, "Game's Add with success");
        }

        public async Task<List<Game>?> GetAll(int id)
        {
            var games = await _context.Games.Where(x => x.UserId.Equals(id)).ToListAsync();
            return games.Count > 0 ? games : null;
        }
    }
}
