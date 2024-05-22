using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core
{
	// [Keyless]
	public partial class TerritorialesDepartamentos : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int TerritorialId { get; set; }
		public string? TerritorialNombre { get; set; }
		public int? DepartamentoId { get; set; }
		public string? DepartamentoNombre { get; set; }
	}
}