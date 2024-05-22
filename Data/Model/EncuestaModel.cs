using SongStock.Data.Core;

namespace SongStock.Data.Model
{

	public partial class EncuestaModel
	{
		public int EncuestaId { get; set; }
		public List<EncuestaPregunta>? Preguntas { get; set; }
	}
}