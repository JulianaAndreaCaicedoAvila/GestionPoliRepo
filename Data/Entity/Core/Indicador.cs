using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class Indicador : BaseEntity
	{

		[Key]
		public int Id { get; set; }
		public int? ObjetivoId { get; set; }
		public string? Nombre { get; set; }
		public string? Descripcion { get; set; }

		// public virtual List<Nucleo>? Nucleos { get; set; }
	}
}