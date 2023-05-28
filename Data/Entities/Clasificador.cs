using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class Clasificador : BaseEntity
	{
		[Key]
		public int Id { get; set; }
		public int TipoId { get; set; }
		public int PadreId { get; set; }
		public string? Nombre { get; set; }
		public string? Descripcion { get; set; }
		public int? Orden { get; set; }
		public DateTime? CreadoEl { get; set; }
		public int? CreadoPor { get; set; }
		public DateTime? EditadoEl { get; set; }
		public int? EditadoPor { get; set; }
		public bool? Activo { get; set; }
		public virtual ClasificadorTipo? ClasificadorTipo { get; set; }
	}
}