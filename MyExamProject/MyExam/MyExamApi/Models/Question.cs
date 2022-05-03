using System;
using System.Collections.Generic;

namespace MyExam.Models
{
    public partial class Question
    {
        public Question()
        {
            Answers = new HashSet<Answer>();
        }

        public int Id { get; set; }
        public string? Title { get; set; }
        public int ExamId { get; set; }
        public string? Difficulty { get; set; }
        public double? Points { get; set; }
        public string? Type { get; set; }
        public DateTime? Date { get; set; }
        public sbyte? Hide { get; set; }

        public virtual Exam Exam { get; set; } = null!;
        public virtual ICollection<Answer> Answers { get; set; }
    }
}
