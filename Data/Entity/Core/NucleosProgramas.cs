using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core
{
	// [Keyless]
	public partial class NucleosProgramas : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int NucleoId { get; set; }
		public string? NucleoNombre { get; set; }
		public int? ProgramaId { get; set; }
		public string? ProgramaNombre { get; set; }
	}
}