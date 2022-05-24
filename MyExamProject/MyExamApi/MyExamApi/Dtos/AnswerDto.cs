namespace MyExamApi.Dtos
{
    public class AnswerDto
    {
        public int Id { get; set; }
        public sbyte? Correct { get; set; }
        public DateTime? Date { get; set; }
        public string? Title { get; set; }
        public int QuestionId { get; set; }
    }
}
