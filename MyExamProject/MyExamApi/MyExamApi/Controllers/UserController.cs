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
    public class UserController : ControllerBase
    {
        private readonly MyExamContext _context;

        public UserController(MyExamContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            var temp = _context.Users.Where(
                x => x.Email == user.Email && x.Password == user.Password)
                .FirstOrDefault();

            if (temp == null)
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
            else
                user = temp;



            return Ok(user);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<User>> Login(User user)
        {
            var temp = _context.Users.Where(
                x => x.Email == user.Email && x.Password == user.Password)
                .FirstOrDefault();

            if (temp == null)
                return BadRequest("Email and password dont much");
            else
                user = temp;
            return Ok(user);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            var temp = _context.Users.Where(
                x => x.Email == user.Email)
                .FirstOrDefault();

            if (temp == null)
            {
                DateTime localDate = DateTime.Now;
                user.Type = "user";
                user.Date = localDate;
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                user = temp;
            }
            else
                return BadRequest("Email already exists");

            return Ok(user);
        }


        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
