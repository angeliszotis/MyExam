using System;
using System.Collections.Generic;

namespace MyExamApi.Models
{
    public partial class Feedback
    {
        public int Id { get; set; }
        public int? Vote { get; set; }
        public int ExamId { get; set; }

        public virtual Exam Exam { get; set; } = null!;
    }
}
