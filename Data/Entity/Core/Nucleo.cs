using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core
{
	public partial class Nucleo : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[ForeignKey("BancoPrograma")]
		public int BancoId { get; set; }
		public string? Nombre { get; set; }
		public DateTime FechaInicio { get; set; }
		public virtual BancoPrograma? BancoPrograma { get; set; }
		public virtual List<Programa>? Programas { get; set; } = new List<Programa>();
	}
}