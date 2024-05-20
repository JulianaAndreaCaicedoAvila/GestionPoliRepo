using System.ComponentModel.DataAnnotations;

namespace Poli.Repositorio.Data.Core {

	public partial class CursosAulas {
		[Key]
		public Guid Id { get; set; }
		public int CursoId { get; set; }
		public string CursoNombre { get; set; }
		public int Aula { get; set; }
		public int Inscritos { get; set; }
	}
}