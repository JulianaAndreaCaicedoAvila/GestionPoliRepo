using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core
{
	// [Keyless]
	public partial class Clasificadores : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int? PadreTipoId { get; set; }
		public string? PadreTipoNombre { get; set; }
		public int PadreId { get; set; }
		public string? PadreNombre { get; set; }
		public int TipoId { get; set; }
		public string? TipoNombre { get; set; }
		public string? Nombre { get; set; }
		public string? Descripcion { get; set; }
		public int? Hijos { get; set; }
	}
}