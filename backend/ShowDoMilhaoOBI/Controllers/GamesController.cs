using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShowDoMilhaoOBI.Domain.Entities;
using ShowDoMilhaoOBI.Domain.Repositories;
using ShowDoMilhaoOBI.DTOs;

namespace ShowDoMilhaoOBI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly IGameRepository _repository;
        private readonly IMapper _mapper;

        public GamesController(IGameRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<ActionResult<Response>> Add(GameDTO game)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var games = _mapper.Map<Game>(game);
            var response = await _repository.Add(games);
            return response.Flag ? Ok(response) : BadRequest(response.Message);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<Game>>> GetAll(int id)
        {
            var games = await _repository.GetAll(id);
            return games is not null ? Ok(games) : BadRequest("No games in database or internal error");
        }

    }
}
