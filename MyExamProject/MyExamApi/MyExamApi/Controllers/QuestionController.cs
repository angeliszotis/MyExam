﻿using System;
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
    public class QuestionController : ControllerBase
    {
        private readonly MyExamContext _context;

        public QuestionController(MyExamContext context)
        {
            _context = context;
        }

        // GET: api/Question
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
          if (_context.Questions == null)
          {
              return NotFound();
          }
            return await _context.Questions.ToListAsync();
        }

        // GET: api/Question/5
        [HttpGet("{id}")]
        //public async Task<ActionResult<Question>> GetQuestion(int id)
        //{
        //  if (_context.Questions == null)
        //  {
        //      return NotFound();
        //  }
        //    var question = await _context.Questions.FindAsync(id);

        //    if (question == null)
        //    {
        //        return NotFound();
        //    }

        //    return question;
        //}

        public async Task<IEnumerable<QuestionDto>> GetQuestion(int id)
        {
            var asdf = (from e in _context.ExamHasQuestions
                        join q in _context.Questions on e.QuestionId equals q.Id
                        where e.ExamId == id

                        select new QuestionDto()
                        {
                            Id = q.Id,
                        }).ToListAsync();

            return await asdf;
        }

        // PUT: api/Question/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {
            if (id != question.Id)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
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

        // POST: api/Question
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
          if (_context.Questions == null)
          {
              return Problem("Entity set 'MyExamContext.Questions'  is null.");
          }
            DateTime localDate = DateTime.Now;
            question.Date = localDate;
            question.Type = "radio";

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestion", new { id = question.Id }, question);
        }

        // DELETE: api/Question/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionExists(int id)
        {
            return (_context.Questions?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
