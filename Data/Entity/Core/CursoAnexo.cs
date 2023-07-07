using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class CursoAnexo : BaseEntity
	{
		[Key]
		public int Id { get; set; }
		public int CursoId { get; set; }
		public int TipoId { get; set; } // Imagen o documento
		public int AnexoId { get; set; }
	}
}