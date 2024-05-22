using SongStock.Data.Core;

namespace SongStock.Data.Model
{

	public partial class CursoEncuestaModel
	{
		public int CursoId { get; set; }
		public List<CursoEncuesta>? Encuestas { get; set; }
	}
}
