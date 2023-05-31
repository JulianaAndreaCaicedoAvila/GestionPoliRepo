using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class Nucleo : BaseEntity
	{
		[Key]
		public int Id { get; set; }
		public int BancoId { get; set; }
		public string? Title { get; set; }
		public string? Nombre { get; set; }
		public DateTime FechaInicio { get; set; }
		public virtual Banco Banco { get; set; }
		public virtual List<Programa> Programas { get; set; }
		public int? CreadoPor { get; set; }
		public int? EditadoPor { get; set; }
		public bool? Activo { get; set; }
	}
}