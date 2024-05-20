using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Poli.Repositorio.Data.Core
{
	public partial class Clasificador : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[ForeignKey("ClasificadorTipo")]
		public int TipoId { get; set; }
		public int? PadreId { get; set; }
		public string? Nombre { get; set; }
		public string? Descripcion { get; set; }
		public virtual ClasificadorTipo? ClasificadorTipo { get; set; }
	}
}