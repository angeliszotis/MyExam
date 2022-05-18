namespace MyExamApi.Dtos
{
    public class GradeDto
    {
        public int Id { get; set; }

        public int UsersId { get; set; }

        public double Grade1 { get; set; }

        public int ExamId { get; set; }

        public DateTime? Date { get; set; }
    }
}
