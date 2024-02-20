using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ESAP.Sirecec.Data.Core {
	public partial class CursoUsuarioAsistencia : BaseEntity {
		[Key]
		public int Id { get; set; }

		[ForeignKey("CursoUsuario")]
		public int CursoUsuarioId { get; set; }
		public DateTime? Fecha { get; set; }
		public string? Jornada { get; set; }
		public bool? Asistio { get; set; }
	}
}