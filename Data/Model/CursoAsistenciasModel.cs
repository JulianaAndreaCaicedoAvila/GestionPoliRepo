using ESAP.Sirecec.Data.Core;

namespace ESAP.Sirecec.Data.Model {

	public partial class CursoAsistenciasModel {
		public CursoUsuario cursoUsuario { get; set; }
		public CursoUsuarioAsistencia asistencia { get; set; }
	}
}
