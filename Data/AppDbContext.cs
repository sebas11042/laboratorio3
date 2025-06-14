using System.Collections.Generic;
using Lab3ApiCursos.Models;
using Microsoft.EntityFrameworkCore;

namespace Lab3ApiCursos.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Curso> Cursos => Set<Curso>();
        public DbSet<Profesor> Profesores => Set<Profesor>();
        public DbSet<Aula> Aulas => Set<Aula>();
    }
}
