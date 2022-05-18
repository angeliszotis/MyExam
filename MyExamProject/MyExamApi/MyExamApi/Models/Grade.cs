using System;
using System.Collections.Generic;

namespace MyExamApi.Models
{
    public partial class Grade
    {
        public int Id { get; set; }
        public int UsersId { get; set; }
        public double? Grade1 { get; set; }
        public DateTime? Date { get; set; }
        public int ExamId { get; set; }

        public virtual Exam Exam { get; set; } = null!;
        public virtual User Users { get; set; } = null!;
    }
}
