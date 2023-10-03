using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class Municipios : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int PaisId { get; set; }
		public string? PaisIso1 { get; set; }
		public string? PaisIso2 { get; set; }
		public string? DepartamentoNombre { get; set; }
		public int DepartamentoId { get; set; }
		public int MunicipioId { get; set; }
		public string? MunicipioNombre { get; set; }
		public string? DepartamentoCodigo { get; set; }
		public string? MunicipioCodigo { get; set; }
		public string? Nombre { get; set; }
		public string? Codigo { get; set; }
	}
}