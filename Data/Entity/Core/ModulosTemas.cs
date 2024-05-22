using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core
{
	public partial class ModulosTemas : BaseEntity
	{
		[Key]
		public int Id { get; set; }
		public int? ModuloId { get; set; }
		public string? ModuloNombre { get; set; }
		public int? TemaId { get; set; }
		public string? TemaNombre { get; set; }
	}
}