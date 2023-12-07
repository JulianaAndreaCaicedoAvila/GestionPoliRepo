using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	// [Keyless]
	public partial class DepartamentosMunicipios : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int DepartamentoId { get; set; }
		public string? DepartamentoNombre { get; set; }
		public int? MunicipioId { get; set; }
		public string? MunicipioNombre { get; set; }
	}
}