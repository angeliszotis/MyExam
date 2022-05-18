using System;
using System.Collections.Generic;

namespace MyExamApi.Models
{
    public partial class Attempt
    {
        public Attempt()
        {
            UsersAnswers = new HashSet<UsersAnswer>();
        }

        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public int ExamId { get; set; }

        public virtual Exam Exam { get; set; } = null!;
        public virtual ICollection<UsersAnswer> UsersAnswers { get; set; }
    }
}
