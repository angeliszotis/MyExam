using System;
using System.Collections.Generic;

namespace MyExamApi.Models
{
    public partial class ExamHasQuestion
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public int QuestionId { get; set; }

        public virtual Exam Exam { get; set; } = null!;
        public virtual Question Question { get; set; } = null!;
    }
}
