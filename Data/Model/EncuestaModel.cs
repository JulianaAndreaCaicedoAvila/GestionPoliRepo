using Poli.Repositorio.Data.Core;

namespace Poli.Repositorio.Data.Model
{

	public partial class EncuestaModel
	{
		public int EncuestaId { get; set; }
		public List<EncuestaPregunta>? Preguntas { get; set; }
	}
}