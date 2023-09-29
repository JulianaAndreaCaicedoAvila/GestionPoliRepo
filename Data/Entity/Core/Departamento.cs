using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class Departamento : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[ForeignKey("Pais")]
		public int PaisId { get; set; }

		[ForeignKey("Clasificador")]
		public int? TerritorialId { get; set; }
		public string? Nombre { get; set; }
		public string? Codigo { get; set; }
		public string? Descripcion { get; set; }
		public virtual List<Municipio>? Municipios { get; set; }
	}
}