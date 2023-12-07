using ESAP.Sirecec.Data.Core;

namespace ESAP.Sirecec.Data.Model
{

	public partial class CursoEncuestaModel
	{
		public int CursoId { get; set; }
		public List<CursoEncuesta>? Encuestas { get; set; }
	}
}
