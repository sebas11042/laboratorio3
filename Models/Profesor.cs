namespace Lab3ApiCursos.Models
{
    public class Profesor
    {
        public int Id { get; set; }

        public required string Nombre { get; set; }

        public required string Especialidad { get; set; }

        public ICollection<Curso>? Cursos { get; set; }
    }
}
