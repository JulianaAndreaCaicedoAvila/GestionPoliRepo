using ESAP.Sirecec.Data.Core;
using Microsoft.AspNetCore.Http;

namespace ESAP.Sirecec.Data.Model
{

	public partial class CursoArchivoModel
	{
		public CursoDocumento Documento { set; get; }
		public IFormFile Archivo { set; get; }
	}
}
