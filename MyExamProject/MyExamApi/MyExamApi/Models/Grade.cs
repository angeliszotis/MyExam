using System;
using System.Collections.Generic;

namespace MyExam.Models
{
    public partial class Grade
    {
        public int Id { get; set; }
        public int UsersId { get; set; }
        public int AttemptsId { get; set; }
        public double? Grade1 { get; set; }
        public DateTime? Date { get; set; }

        public virtual Attempt Attempts { get; set; } = null!;
        public virtual User Users { get; set; } = null!;
    }
}
