using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyExamApi.Data;
using MyExamApi.Dtos;
using MyExamApi.Models;

namespace MyExamApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private readonly MyExamContext _context;

        public ExamController(MyExamContext context)
        {
            _context = context;
        }

        // GET: api/Exam
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exam>>> GetExams()
        {
          if (_context.Exams == null)
          {
              return NotFound();
          }
            return await _context.Exams.ToListAsync();
        }

        // GET: api/Exam/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Exam>> GetExam(int id)
        {
          if (_context.Exams == null)
          {
              return NotFound();
          }
            var exam = await _context.Exams.FindAsync(id);

            if (exam == null)
            {
                return NotFound();
            }

            return exam;
        }

        // PUT: api/Exam/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExam(int id, Exam exam)
        {
            if (id != exam.Id)
            {
                return BadRequest();
            }

            _context.Entry(exam).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Exam
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Exam>> CreateExam(ExamDto request)
        {
            var user = await _context.Users.FindAsync(request.Owner);
            DateTime localDate = DateTime.Now;

            if (user == null)
                return NotFound();

            var newExam = new Exam  {
                Id = request.Id,
                Name = request.Name,
                Description = request.Description,
                ExamsTime = request.ExamsTime,
                NumberOfQuestions = request.NumberOfQuestions,
                OwnerNavigation = user,
                Date = localDate,
    
            };
            _context.Exams.Add(newExam);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Exam/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExam(int id)
        {
            if (_context.Exams == null)
            {
                return NotFound();
            }
            var exam = await _context.Exams.FindAsync(id);
            if (exam == null)
            {
                return NotFound();
            }

            _context.Exams.Remove(exam);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExamExists(int id)
        {
            return (_context.Exams?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
