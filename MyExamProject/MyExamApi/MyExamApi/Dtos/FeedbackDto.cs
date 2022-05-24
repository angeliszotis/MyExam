namespace MyExamApi.Dtos
{
    public class FeedbackDto
    {
        public int Id { get; set; }
        public int? Vote { get; set; }
        public int ExamId { get; set; }
    }
}
