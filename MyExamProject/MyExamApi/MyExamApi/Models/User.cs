using System;
using System.Collections.Generic;

namespace MyExam.Models
{
    public partial class User
    {
        public User()
        {
            Exams = new HashSet<Exam>();
            Grades = new HashSet<Grade>();
            UsersAnswers = new HashSet<UsersAnswer>();
        }

        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Type { get; set; }
        public DateTime? Date { get; set; }

        public virtual ICollection<Exam> Exams { get; set; }
        public virtual ICollection<Grade> Grades { get; set; }
        public virtual ICollection<UsersAnswer> UsersAnswers { get; set; }
    }
}
