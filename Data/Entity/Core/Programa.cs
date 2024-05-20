using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Poli.Repositorio.Data.Core
{
	public partial class Programa : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[ForeignKey("Nucleo")]
		public int NucleoId { get; set; }
		public string? Nombre { get; set; }
		public DateTime FechaInicio { get; set; }
		public virtual Nucleo? Nucleo { get; set; }
	}
}