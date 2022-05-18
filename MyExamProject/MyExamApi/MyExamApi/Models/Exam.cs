using System;
using System.Collections.Generic;

namespace MyExamApi.Models
{
    public partial class Exam
    {
        public Exam()
        {
            Attempts = new HashSet<Attempt>();
            Feedbacks = new HashSet<Feedback>();
            Grades = new HashSet<Grade>();
            Questions = new HashSet<Question>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime? Date { get; set; }
        public sbyte? Hide { get; set; }
        public int UsersId { get; set; }
        public int ExamsTime { get; set; }

        public virtual User Users { get; set; } = null!;
        public virtual ICollection<Attempt> Attempts { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<Grade> Grades { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
    }
}
