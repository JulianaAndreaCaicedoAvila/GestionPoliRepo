using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core
{
	public partial class BancoPrograma : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string? Nombre { get; set; }
		public DateTime? FechaInicio { get; set; }
		public virtual List<Nucleo>? Nucleos { get; set; } = new List<Nucleo>();
	}
}