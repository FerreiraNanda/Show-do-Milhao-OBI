using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using ShowDoMilhaoOBI.Domain.Entities;
using ShowDoMilhaoOBI.Domain.Repositories;
using ShowDoMilhaoOBI.DTOs;

namespace ShowDoMilhaoOBI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionRepository _repository;
        private readonly IMapper _mapper;

        public QuestionsController(IQuestionRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("GetAllQuestions")]
        public async Task<ActionResult<Question>> GetAllQuestions()
        {
            var questions = await _repository.GetAll();
            return questions is not null ? Ok(questions) : NotFound("Internal error or no questions in database");
        }
        [HttpGet("GetById/{id:int}")]
        public async Task<ActionResult<Question>> GetQuestionById(int id)
        {
            if (id <= 0) return BadRequest("Invalid id");

            var question = await _repository.GetById(id);
            return question is not null ? Ok(question) : NotFound("Question not found");
        }

        [HttpPost]
        public async Task<ActionResult<Response>> PostQuestion(QuestionDTO question)
        {
            if (!ModelState.IsValid) return BadRequest(question);
            var newQuestion = _mapper.Map<Question>(question);
            var response = await _repository.Add(newQuestion);
            return response.Flag ? Ok(response) : BadRequest(response.Message);
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Question>> EditQuestion(QuestionDTO question, int id)
        {
            if(!ModelState.IsValid) return BadRequest(question);
            var oldQuestion = _mapper.Map<Question>(question);
            oldQuestion.Id = id;
            var response = await _repository.Update(oldQuestion);
            return response.Flag ? Ok(response) : BadRequest(response.Message); 

        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Response>> DeleteQuestion(int id)
        {
            if (id <= 0) return BadRequest("Invalid id");

            var response = await _repository.Delete(id);
            return response.Flag ? Ok(response) : NotFound(response.Message);
        }

        [HttpGet("Start")]
        public async Task<ActionResult<List<Question>>> Start()
        {
            var questions = await _repository.GetSevenQuestions();
            return questions is not null ? questions : BadRequest("No questions in database or internal error");
        }
        [HttpGet("{type:int}/{modality:int}")]
        public async Task<ActionResult<IEnumerable<Question>>?> GetQuestionsByTypeAndModality(int type, int modality)
        {
            var questions = await _repository.GetQuestionsByTypeAndModality(type, modality);
            if (questions is null) return BadRequest("Error");
            return Ok(questions);
        }
    }
}
