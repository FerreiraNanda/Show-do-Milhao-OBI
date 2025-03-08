using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShowDoMilhaoOBI.Domain.Entities;
using ShowDoMilhaoOBI.Domain.Repositories;
using ShowDoMilhaoOBI.DTOs;
using ShowDoMilhaoOBI.Services;

namespace ShowDoMilhaoOBI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _repository;

        public UsersController(IMapper mapper, IUserRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<Response>> Register(RegisterDTO register)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var encripty = new EncriptyPassword();

            var user = _mapper.Map<User>(register);
            user.Password = encripty.Encrypt(user.Password);
            var response = await _repository.Add(user);

            return response.Flag ? Ok(response) : BadRequest(response.Message);

        }
        [HttpPost("Login")]
        public async Task<ActionResult<User>> Login(LoginDTO login)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var encripty = new EncriptyPassword();

            login.Password = encripty.Encrypt(login.Password);

            var user = await _repository.GetByEmailAndPassword(login.Email, login.Password);

            return user is not null ? Ok(user) : BadRequest("Email or Password Invalid!."); 

        }
        [HttpPost("Edit/{id:int}")]
        public async Task<ActionResult<Response>> Edit(EditAccountDTO editAccount, int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = _mapper.Map<User>(editAccount);
            user.Id = id;
            var respose = await _repository.Update(user);

            return respose.Flag ? Ok(respose) : BadRequest(respose.Message);
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Response>> Delete(int id)
        {
            if (id <= 0) return BadRequest("Invalid id");

            var response = await _repository.Delete(id);

            return response.Flag ? Ok(response.Message) : BadRequest(response.Message);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> GetById(int id)
        {
            if (id <= 0) return BadRequest("Invalid id");

            var user = await _repository.GetById(id);

            return user is not null ? Ok(user) : BadRequest("User not found");
        }
        [HttpGet("Rank")]
        public async Task<ActionResult<List<User>>> Rank()
        {
            var rank = await _repository.GetByRank();
            return rank is not null ? Ok(rank) : BadRequest("No users in database or internal error");
        }
        [HttpPost("{id:int}/{amount:int}")]
        public async Task<ActionResult<Response>> UpdateAmount(int id, int amount)
        {
            if (amount < 0) return BadRequest("Invalid Number");

            var response = await _repository.UpdateAmount(id, amount);

            return response.Flag ? Ok(response.Message) : BadRequest(response.Message);
        }

    }
}
