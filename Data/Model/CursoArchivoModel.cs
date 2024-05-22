using SongStock.Data.Core;
using Microsoft.AspNetCore.Http;

namespace SongStock.Data.Model
{

	public partial class CursoArchivoModel
	{
		public CursoDocumento Documento { set; get; }
		public IFormFile Archivo { set; get; }
	}
}
