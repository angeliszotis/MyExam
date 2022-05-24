using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MyExamApi.Models
{
    public partial class ExamHasQuestion
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public int QuestionId { get; set; }

        [JsonIgnore]
        public virtual Exam Exam { get; set; } = null!;
        [JsonIgnore]
        public virtual Question Question { get; set; } = null!;
    }
}
