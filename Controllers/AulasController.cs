using Lab3ApiCursos.Data;
using Lab3ApiCursos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lab3ApiCursos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AulasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AulasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/aulas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aula>>> GetAulas()
        {
            return await _context.Aulas.ToListAsync();
        }

        // GET: api/aulas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Aula>> GetAula(int id)
        {
            var aula = await _context.Aulas.FindAsync(id);

            if (aula == null)
            {
                return NotFound();
            }

            return aula;
        }

        // POST: api/aulas
        [HttpPost]
        public async Task<ActionResult<Aula>> PostAula(Aula aula)
        {
            _context.Aulas.Add(aula);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAula), new { id = aula.Id }, aula);
        }

        // PUT: api/aulas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAula(int id, Aula aula)
        {
            if (id != aula.Id)
            {
                return BadRequest();
            }

            _context.Entry(aula).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Aulas.Any(e => e.Id == id))
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

        // DELETE: api/aulas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAula(int id)
        {
            var aula = await _context.Aulas.FindAsync(id);
            if (aula == null)
            {
                return NotFound();
            }

            _context.Aulas.Remove(aula);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: api/aulas/libres
        [HttpGet("libres")]
        public async Task<ActionResult<IEnumerable<Aula>>> GetAulasNoAsignadas()
        {
            var aulasAsignadas = await _context.Cursos
                .Select(c => c.AulaId)
                .Distinct()
                .ToListAsync();

            var aulasLibres = await _context.Aulas
                .Where(a => !aulasAsignadas.Contains(a.Id))
                .ToListAsync();

            return aulasLibres;
        }

    }
}
