using System;
using System.Collections.Generic;

namespace MyExamApi.Models
{
    public partial class UsersAnswer
    {
        public int Id { get; set; }
        public double? Point { get; set; }
        public int AttemptsId { get; set; }
        public int UsersId { get; set; }
        public int AnswersId { get; set; }

        public virtual Answer Answers { get; set; } = null!;
        public virtual Attempt Attempts { get; set; } = null!;
        public virtual User Users { get; set; } = null!;
    }
}
