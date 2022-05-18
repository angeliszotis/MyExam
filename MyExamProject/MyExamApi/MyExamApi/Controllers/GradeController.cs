using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyExamApi.Data;
using MyExamApi.Models;
using MyExamApi.Dtos;

namespace MyExamApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        private readonly MyExamContext _context;

        public GradeController(MyExamContext context)
        {
            _context = context;
        }

        // GET: api/Grade
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Grade>>> GetGrades()
        {
          if (_context.Grades == null)
          {
              return NotFound();
          }
            return await _context.Grades.ToListAsync();
        }

        // GET: api/Grade/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Grade>> GetGrade(int id)
        {
          if (_context.Grades == null)
          {
              return NotFound();
          }
            var grade = await _context.Grades.FindAsync(id);

            if (grade == null)
            {
                return NotFound();
            }

            return grade;
        }

        // PUT: api/Grade/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGrade(int id, Grade grade)
        {
            if (id != grade.Id)
            {
                return BadRequest();
            }

            _context.Entry(grade).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GradeExists(id))
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

        // POST: api/Grade
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Grade>> CreateGrade(GradeDto request)
        {
            var user = await _context.Users.FindAsync(request.UsersId);
            var exam = await _context.Exams.FindAsync(request.ExamId);
            DateTime localDate = DateTime.Now;

            if (user == null)
                return NotFound();

            var newGrade = new Grade
            {
                Id = request.Id,
                UsersId = request.UsersId,
                Grade1 = request.Grade1,
                Date = localDate,
                Users = user,
                Exam =exam
            };

            _context.Grades.Add(newGrade);
            await _context.SaveChangesAsync();

            return await GetGrade(newGrade.UsersId);
        }

        // DELETE: api/Grade/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrade(int id)
        {
            if (_context.Grades == null)
            {
                return NotFound();
            }
            var grade = await _context.Grades.FindAsync(id);
            if (grade == null)
            {
                return NotFound();
            }

            _context.Grades.Remove(grade);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GradeExists(int id)
        {
            return (_context.Grades?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
