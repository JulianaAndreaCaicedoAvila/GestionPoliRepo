using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Poli.Repositorio.Data.Core
{
	public partial class Pais : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int Codigo { get; set; }
		public string? Iso1 { get; set; }
		public string? Iso2 { get; set; }
		public string? Nombre { get; set; }
		public virtual List<Departamento>? Departamentos { get; set; }
	}
}