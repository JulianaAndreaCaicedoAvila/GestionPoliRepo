using SongStock.Data.Core;

namespace SongStock.Data.Model
{

	public partial class CursoTemaModel
	{
		public int CursoId { get; set; }
		public List<CursoTema>? Temas { get; set; }
	}
}
