using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core
{
	public partial class Departamentos : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int PaisId { get; set; }
		public int? TerritorialId { get; set; }
		public string? Nombre { get; set; }
		public string? Codigo { get; set; }
		public virtual List<Municipio>? Municipios { get; set; }
	}
}

