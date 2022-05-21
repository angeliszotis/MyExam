using System;
using System.Collections.Generic;

namespace MyExamApi.Models
{
    public partial class Question
    {
        public Question()
        {
            Answers = new HashSet<Answer>();
            ExamHasQuestions = new HashSet<ExamHasQuestion>();
        }

        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Difficulty { get; set; }
        public string? Type { get; set; }
        public DateTime? Date { get; set; }

        public virtual ICollection<Answer> Answers { get; set; }
        public virtual ICollection<ExamHasQuestion> ExamHasQuestions { get; set; }
    }
}
