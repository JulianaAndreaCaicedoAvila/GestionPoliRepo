using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ESAP.Sirecec.Data.Core
{
	public partial class CursoUsuario : BaseEntity
	{
		[Key]
		public int Id { get; set; }

		[ForeignKey("Curso")]
		public int CursoId { get; set; }

		[ForeignKey("AuthUsers")]
		public int UsuarioId { get; set; }
	}
}