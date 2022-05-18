namespace MyExamApi.Dtos
{
    public class ExamDto
    {
        public int Id { get; set; }

        public int UsersId { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public DateTime? Date { get; set; }

        public int Hide { get; set; }

        public int ExamsTime { get; set; }

    }
}
