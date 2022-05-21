﻿using System;
using System.Collections.Generic;

namespace MyExamApi.Models
{
    public partial class Answer
    {
        public int Id { get; set; }
        public sbyte? Correct { get; set; }
        public DateTime? Date { get; set; }
        public string? Title { get; set; }
        public int QuestionId { get; set; }

        public virtual Question Question { get; set; } = null!;
    }
}
