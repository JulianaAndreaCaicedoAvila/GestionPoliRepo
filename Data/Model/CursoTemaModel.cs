using Poli.Repositorio.Data.Core;

namespace Poli.Repositorio.Data.Model
{

	public partial class CursoTemaModel
	{
		public int CursoId { get; set; }
		public List<CursoTema>? Temas { get; set; }
	}
}
