using Poli.Repositorio.Data.Core;

namespace Poli.Repositorio.Data.Model {

	public partial class CursoAsistenciaModel {
		public CursoUsuario cursoUsuario { get; set; }
		public CursoUsuarioAsistencia asistencia { get; set; }
	}
}
