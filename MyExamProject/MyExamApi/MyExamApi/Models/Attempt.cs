using System;
using System.Collections.Generic;

namespace MyExam.Models
{
    public partial class Attempt
    {
        public Attempt()
        {
            Grades = new HashSet<Grade>();
        }

        public int Id { get; set; }
        public int ExamId { get; set; }
        public int UsersAnswersId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public DateTime? Data { get; set; }

        public virtual Exam Exam { get; set; } = null!;
        public virtual UsersAnswer UsersAnswers { get; set; } = null!;
        public virtual ICollection<Grade> Grades { get; set; }
    }
}
