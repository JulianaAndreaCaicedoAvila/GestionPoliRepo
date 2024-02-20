using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ESAP.Sirecec.Data.Core {
	public partial class CursosAsistencias {
		[Key]
		public int Id { get; set; }
		public int CursoUsuarioId { get; set; }
		public int CursoId { get; set; }
		public int UsuarioId { get; set; }
		public DateTime? Fecha { get; set; }
		public string? Jornada { get; set; }
		public bool? Asistio { get; set; }
	}
}

