using Lab3ApiCursos.Data;
using Lab3ApiCursos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lab3ApiCursos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CursosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/cursos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curso>>> GetCursos()
        {
            return await _context.Cursos
                .Include(c => c.Profesor)
                .Include(c => c.Aula)
                .ToListAsync();
        }

        // GET: api/cursos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Curso>> GetCurso(int id)
        {
            var curso = await _context.Cursos
                .Include(c => c.Profesor)
                .Include(c => c.Aula)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (curso == null)
            {
                return NotFound();
            }

            return curso;
        }

        // POST: api/cursos
        [HttpPost]
        public async Task<ActionResult<Curso>> PostCurso(Curso curso)
        {
            _context.Cursos.Add(curso);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCurso), new { id = curso.Id }, curso);
        }

        // PUT: api/cursos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurso(int id, Curso curso)
        {
            if (id != curso.Id)
            {
                return BadRequest();
            }

            _context.Entry(curso).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Cursos.Any(e => e.Id == id))
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

        // DELETE: api/cursos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurso(int id)
        {
            var curso = await _context.Cursos.FindAsync(id);
            if (curso == null)
            {
                return NotFound();
            }

            _context.Cursos.Remove(curso);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/cursos/sincupo
        [HttpGet("sincupo")]
        public async Task<ActionResult<IEnumerable<Curso>>> GetCursosSinCupo()
        {
            return await _context.Cursos
                .Where(c => c.Cupo <= 0)
                .Include(c => c.Profesor)
                .Include(c => c.Aula)
                .ToListAsync();
        }

    }
}
