namespace Lab3ApiCursos.Models
{
    public class Aula
    {
        public int Id { get; set; }

        public required string Nombre { get; set; }

        public int Capacidad { get; set; }

        public ICollection<Curso>? Cursos { get; set; }
    }
}
