using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class Tema : BaseEntity
	{
		[Key]
		public int Id { get; set; }
		public int DependenciaId { get; set; }
		public int ModuloId { get; set; }
		public string? Nombre { get; set; }
		public virtual Modulo? Modulo { get; set; }
		public virtual Clasificador? Dependencia { get; set; }

	}
}