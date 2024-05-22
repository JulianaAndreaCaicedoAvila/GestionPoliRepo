using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core
{
	// [Keyless]
	public partial class ProductosIndicadores : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int ProductoId { get; set; }
		public string? ProductoNombre { get; set; }
		public int? IndicadorId { get; set; }
		public string? IndicadorNombre { get; set; }
	}
}