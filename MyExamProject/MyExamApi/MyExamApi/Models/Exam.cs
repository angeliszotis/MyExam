using System;
using System.Collections.Generic;

namespace MyExamApi.Models
{
    public partial class Exam
    {
        public Exam()
        {
            ExamHasQuestions = new HashSet<ExamHasQuestion>();
            Feedbacks = new HashSet<Feedback>();
            Grades = new HashSet<Grade>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime? Date { get; set; }
        public int Owner { get; set; }
        public int? ExamsTime { get; set; }
        public int? NumberOfQuestions { get; set; }

        public virtual User OwnerNavigation { get; set; } = null!;
        public virtual ICollection<ExamHasQuestion> ExamHasQuestions { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<Grade> Grades { get; set; }
    }
}
