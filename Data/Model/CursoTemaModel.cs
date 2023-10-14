using ESAP.Sirecec.Data.Core;

namespace ESAP.Sirecec.Data.Model
{

	public partial class CursoTemaModel
	{
		public int CursoId { get; set; }
		public List<CursoTema>? Temas { get; set; }
	}
}
