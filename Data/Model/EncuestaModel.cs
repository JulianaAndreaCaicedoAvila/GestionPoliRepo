using ESAP.Sirecec.Data.Core;

namespace ESAP.Sirecec.Data.Model
{

	public partial class EncuestaModel
	{
		public int EncuestaId { get; set; }
		public List<EncuestaPregunta>? Preguntas { get; set; }
	}
}