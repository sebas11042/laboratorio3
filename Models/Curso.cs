namespace Lab3ApiCursos.Models
{
    public class Curso
    {
        public int Id { get; set; }

        public required string Nombre { get; set; }  // Obligatorio

        public int Cupo { get; set; }

        public int ProfesorId { get; set; }
        public Profesor? Profesor { get; set; }

        public int AulaId { get; set; }
        public Aula? Aula { get; set; }
    }
}
