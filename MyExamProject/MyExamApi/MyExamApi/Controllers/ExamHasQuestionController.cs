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
    public class ExamHasQuestionController : ControllerBase
    {
        private readonly MyExamContext _context;

        public ExamHasQuestionController(MyExamContext context)
        {
            _context = context;
        }

        // GET: api/ExamHasQuestion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExamHasQuestion>>> GetExamHasQuestions()
        {
          if (_context.ExamHasQuestions == null)
          {
              return NotFound();
          }
            return await _context.ExamHasQuestions.ToListAsync();
        }

        // GET: api/ExamHasQuestion/5
        [HttpGet("{id}")]
        //public async Task<ActionResult<IEnumerable<ExamHasQuestion>>> GetExamHasQuestion(int id)
        //{
        //    return await _context.ExamHasQuestions.Where(c => c.ExamId == id).ToListAsync();
        //}

        public async Task<IEnumerable<ExamHasQuestionDto>> GetExamHasQuestion(int id)
        {
            var asdf = (from e in _context.ExamHasQuestions
                       join q in _context.Questions on e.QuestionId equals q.Id
                       where e.ExamId == id

                       select new ExamHasQuestionDto()
                       {
                           QuestionId = q.Id,
                           Title = q.Title
                       }).ToListAsync();

            return await asdf;
        }

        // PUT: api/ExamHasQuestion/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExamHasQuestion(int id, ExamHasQuestion examHasQuestion)
        {
            if (id != examHasQuestion.ExamId)
            {
                return BadRequest();
            }

            _context.Entry(examHasQuestion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExamHasQuestionExists(id))
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

        // POST: api/ExamHasQuestion
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ExamHasQuestion>> PostExamHasQuestion(ExamQuestionDto examHasQuestion)
        {
            var exam = await _context.Exams.FindAsync(examHasQuestion.ExamId);
            var question = await _context.Questions.FindAsync(examHasQuestion.QuestionId);

            if (exam == null)
                return NotFound();

            var newExamHasQuestion = new ExamHasQuestion
            {
                QuestionId = examHasQuestion.QuestionId,
                ExamId = examHasQuestion.ExamId,
                Exam = exam,
                Question = question,
            };

            _context.ExamHasQuestions.Add(newExamHasQuestion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/ExamHasQuestion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExamHasQuestion(int id)
        {
            if (_context.ExamHasQuestions == null)
            {
                return NotFound();
            }
            var examHasQuestion = await _context.ExamHasQuestions.FindAsync(id);
            if (examHasQuestion == null)
            {
                return NotFound();
            }

            _context.ExamHasQuestions.Remove(examHasQuestion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExamHasQuestionExists(int id)
        {
            return (_context.ExamHasQuestions?.Any(e => e.ExamId == id)).GetValueOrDefault();
        }
    }
}
