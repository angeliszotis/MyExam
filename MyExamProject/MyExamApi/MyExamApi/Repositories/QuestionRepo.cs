
using Microsoft.EntityFrameworkCore;
using MyExam.Data;
using MyExam.Models;

namespace MyExamApi.Repositories

{
    public class QuestionRepo
    {
        private readonly MyExamContext _context;
        public QuestionRepo(MyExamContext context)
        {
            _context = context;
        }

        public DbSet<Question> All()
        {
            return _context.Questions;
        }

    }
}
