using Poli.Repositorio.Data.Core;

namespace Poli.Repositorio.Data.Model
{

	public partial class CursoEncuestaModel
	{
		public int CursoId { get; set; }
		public List<CursoEncuesta>? Encuestas { get; set; }
	}
}
