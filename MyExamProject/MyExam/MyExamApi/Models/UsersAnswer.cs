using System;
using System.Collections.Generic;

namespace MyExam.Models
{
    public partial class UsersAnswer
    {
        public UsersAnswer()
        {
            Attempts = new HashSet<Attempt>();
        }

        public int Id { get; set; }
        public int UsersId { get; set; }
        public int AnswersId { get; set; }
        public double? Point { get; set; }

        public virtual Answer Answers { get; set; } = null!;
        public virtual User Users { get; set; } = null!;
        public virtual ICollection<Attempt> Attempts { get; set; }
    }
}
