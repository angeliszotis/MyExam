﻿using System;
using System.Collections.Generic;

namespace MyExamApi.Models
{
    public partial class User
    {
        public User()
        {
            Exams = new HashSet<Exam>();
            Grades = new HashSet<Grade>();
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
    }
}
