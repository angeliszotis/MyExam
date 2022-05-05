using System;
using System.Collections.Generic;

namespace MyExam.Models
{
    public partial class Answer
    {
        public Answer()
        {
            UsersAnswers = new HashSet<UsersAnswer>();
        }

        public int Id { get; set; }
        public int QuestionId { get; set; }
        public sbyte Correct { get; set; }
        public sbyte Hide { get; set; }
        public DateTime? Date { get; set; }
        public double? Points { get; set; }
        public string? Title { get; set; }

        public virtual Question Question { get; set; } = null!;
        public virtual ICollection<UsersAnswer> UsersAnswers { get; set; }
    }
}
