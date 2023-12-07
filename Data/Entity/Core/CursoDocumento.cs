using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class CursoDocumento : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[ForeignKey("Curso")]
		public int CursoId { get; set; }

		[ForeignKey("Clasificador")]
		public int TipoDocumentoId { get; set; }
		public string? Nombre { get; set; }
		public string? Peso { get; set; }
		public virtual Curso? Curso { get; set; }
	}
}