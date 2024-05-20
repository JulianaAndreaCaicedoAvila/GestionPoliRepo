using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Poli.Repositorio.Data.Core
{
	// [Keyless]
	public partial class BancoProgramasNucleos : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int BancoId { get; set; }
		public string? BancoProgramaNombre { get; set; }
		public int? NucleoId { get; set; }
		public string? NucleoNombre { get; set; }
	}
}