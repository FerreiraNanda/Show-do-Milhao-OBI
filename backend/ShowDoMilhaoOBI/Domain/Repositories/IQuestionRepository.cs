using ShowDoMilhaoOBI.Domain.Entities;
using ShowDoMilhaoOBI.DTOs;

namespace ShowDoMilhaoOBI.Domain.Repositories
{
    public interface IQuestionRepository
    {
        public Task<Response> Add(Question question);
        public Task<Response> Update(Question question);
        public Task<Response> Delete(int id);
        public Task<Question?> GetById(int id);
        public Task<List<Question>?> GetAll();
        public Task<List<Question>?> GetSevenQuestions();
        public Task<IEnumerable<Question>?> GetQuestionsByTypeAndModality(int type, int modality);
    }
}
