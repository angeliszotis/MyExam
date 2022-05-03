using System;
using System.Collections.Generic;

namespace MyExam.Models
{
    public partial class Feedback
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public string? Vote { get; set; }

        public virtual Exam Exam { get; set; } = null!;
    }
}
