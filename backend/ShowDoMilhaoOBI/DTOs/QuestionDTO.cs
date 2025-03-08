using ShowDoMilhaoOBI.Domain.Enums;

namespace ShowDoMilhaoOBI.DTOs
{
    public class QuestionDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Statement { get; set; } = string.Empty;
        public List<string> Options { get; set; } = [];
        public string CorrectOption { get; set; } = string.Empty;
        public Modality Modality { get; set; }
        public TypeEnum Type { get; set; }
    }
}
