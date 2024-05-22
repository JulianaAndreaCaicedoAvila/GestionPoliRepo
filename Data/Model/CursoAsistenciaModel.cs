using SongStock.Data.Core;

namespace SongStock.Data.Model {

	public partial class CursoAsistenciaModel {
		public CursoUsuario cursoUsuario { get; set; }
		public CursoUsuarioAsistencia asistencia { get; set; }
	}
}
