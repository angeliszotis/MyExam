#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyExam.Data;
using MyExam.Models;

namespace MyExamApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly MyExamContext _context;

        public AnswerController(MyExamContext context)
        {
            _context = context;
        }

        // GET: api/Answer
        [Route("retrieveAnswers/{id}")]
        [HttpGet]
  
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswers(int id)
        {
            return await _context.Answers.Where(c => c.QuestionId == id).ToListAsync();
        }

        // GET: api/Answer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Answer>> GetAnswer(int id)
        {
            var answer = await _context.Answers.FindAsync(id);

            if (answer == null)
            {
                return NotFound();
            }

            return answer;
        }

        // PUT: api/Answer/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnswer(int id, Answer answer)
        {
            if (id != answer.Id)
            {
                return BadRequest();
            }

            _context.Entry(answer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnswerExists(id))
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

        // POST: api/Answer
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Answer>> PostAnswer(Answer answer)
        {
            _context.Answers.Add(answer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnswer", new { id = answer.Id }, answer);
        }

        //[Route("retrieveNumberOfAnswers")]
        //[HttpPost]
        //public async Task<ActionResult<Answer>> retrieveQuestions(int[] answerIds)
        //{
        //    var answers = await (_context.Answers.Where(x => answerIds.Contains(x.Id))
        //    .Select(x => new
        //    {
        //        questionId = x.QuestionId,
        //        answerId = x.Id,
        //        correct = x.Correct
        //    }

        //        )).ToListAsync();

        //    return Ok(answers);
        //}

        // POST: api/Answer/retrieveCorrectAnswers
        [Route("retrieveCorrectAnswers")]
        [HttpPost]
        public async Task<ActionResult<Answer>> retrieveCorrectAnswers(int[] answerIds)
        {
            var answers = await (_context.Answers.Where(x => answerIds.Contains(x.Id))
            .Select(x => new
            {
                questionId = x.QuestionId,
                answerId = x.Id,
                correct = x.Correct
            }

                )).Where(x => x.correct == 1).ToListAsync();

            return Ok(answers);
        }

        // DELETE: api/Answer/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnswer(int id)
        {
            var answer = await _context.Answers.FindAsync(id);
            if (answer == null)
            {
                return NotFound();
            }

            _context.Answers.Remove(answer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnswerExists(int id)
        {
            return _context.Answers.Any(e => e.Id == id);
        }
    }
}
