using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Poli.Repositorio.Data.Core
{
	public partial class Municipios
	{
		public int PaisId { get; set; }
		public string? PaisNombre { get; set; }
		public string? PaisIso1 { get; set; }
		public string? PaisIso2 { get; set; }
		public int DepartamentoId { get; set; }
		public string? DepartamentoNombre { get; set; }
		public string? DepartamentoCodigo { get; set; }
		[Key]
		public int MunicipioId { get; set; }
		public string? MunicipioNombre { get; set; }
		public string? MunicipioCodigo { get; set; }
		public bool? MunicipioActivo { get; set; }
	}
}