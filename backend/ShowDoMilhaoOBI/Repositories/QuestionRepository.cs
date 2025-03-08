using Microsoft.EntityFrameworkCore;
using ShowDoMilhaoOBI.Context;
using ShowDoMilhaoOBI.Domain.Entities;
using ShowDoMilhaoOBI.Domain.Enums;
using ShowDoMilhaoOBI.Domain.Repositories;
using ShowDoMilhaoOBI.DTOs;

namespace ShowDoMilhaoOBI.Repositories
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly AppDbContext _context;

        public QuestionRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Response> Add(Question question)
        {
            try
            {
                question.Options.Add(question.CorrectOption);
                await _context.Questions.AddAsync(question);
                await _context.SaveChangesAsync();
                return new Response(true, "Question add with success");
            }
            catch (Exception ex)
            {
                return new Response(false, $"not possible by: {ex.Message}");
            }
        }

        public async Task<Response> Delete(int id)
        {
            var question = await _context.Questions.FirstOrDefaultAsync(q => q.Id.Equals(id));
            if (question is null) return new Response(false, "Question not found");

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();
            return new Response(true,  $"Question {question.Id} deleted");
        }

        public async Task<List<Question>?> GetAll()
        {
            var questions = await _context.Questions.ToListAsync();
            return questions.Count > 0 ? questions : null;
        }

        public async Task<Question?> GetById(int id)
        {
            var question = await _context.Questions.FirstOrDefaultAsync(_ => _.Id.Equals(id));
            return question is not null ? question : null;
        }

        public async Task<IEnumerable<Question>?> GetQuestionsByTypeAndModality(int type, int modality)
        {
            var questions = new List<Question>();

            if (type == 0)
            {
                questions = await _context.Questions.Where(q => q.Modality.Equals((Modality)modality))
                    .OrderBy(q => Guid.NewGuid())
                    .Take(7)
                    .ToListAsync();
            }
            else
            {
                questions = await _context.Questions
                    .Where(q => q.Modality.Equals((Modality)modality) && q.Type.Equals((TypeEnum)type))
                    .OrderBy(q => Guid.NewGuid())
                    .Take(7)
                    .ToListAsync();
            }

            if (questions.Count <= 0) return null;
            var random = new Random();
            foreach (var question in questions)
            {
                question.Options = question.Options.OrderBy(x => random.Next()).ToList();
            }

            return questions;
        }


        public async Task<List<Question>?> GetSevenQuestions()
        {
            var questions = await _context.Questions
                .OrderBy(q => Guid.NewGuid()).Take(7).ToListAsync();

            var rdm = new Random();
            foreach (var question in questions) 
            {
                question.Options = question.Options.OrderBy(x =>  rdm.Next()).ToList();
            }

            return questions.Count == 7 ? questions : null; 
        }

        public async Task<Response> Update(Question question)
        {
            var oldQuestion = await _context.Questions.FirstOrDefaultAsync(q => q.Id.Equals(question.Id));
            if (oldQuestion is null) return new Response(false, "Question not found");

            oldQuestion.Title = question.Title;
            oldQuestion.Statement = question.Statement;
            oldQuestion.Options = question.Options;
            oldQuestion.CorrectOption = question.CorrectOption;
            _context.Questions.Update(oldQuestion);
            await _context.SaveChangesAsync();

            return new Response(true, "Question is updated with success");
        }
    }
}
