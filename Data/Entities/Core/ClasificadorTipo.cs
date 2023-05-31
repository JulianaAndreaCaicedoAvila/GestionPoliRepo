﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class ClasificadorTipo : BaseEntity
	{
		[Key]
		public int Id { get; set; }
		public string? Nombre { get; set; }
		public string? Descripcion { get; set; }
		public DateTime? CreadoEl { get; set; }
		public int? CreadoPor { get; set; }
		public DateTime? EditadoEl { get; set; }
		public int? EditadoPor { get; set; }
		public virtual List<Clasificador>? Clasificadores { get; set; }
	}
}