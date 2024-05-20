using Poli.Repositorio.Data.Core;
using Microsoft.AspNetCore.Http;

namespace Poli.Repositorio.Data.Model
{

	public partial class CursoArchivoModel
	{
		public CursoDocumento Documento { set; get; }
		public IFormFile Archivo { set; get; }
	}
}
