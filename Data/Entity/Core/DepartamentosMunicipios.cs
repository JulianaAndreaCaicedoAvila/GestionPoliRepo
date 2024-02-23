using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core {
	[Keyless]
	public partial class DepartamentosMunicipios : BaseEntity {
		public int PaisId { get; set; }
		public string? PaisCodigo { get; set; }
		public string? PaisNombre { get; set; }
		public int DepartamentoId { get; set; }
		public string? DepartamentoNombre { get; set; }
		public string? DepartamentoCodigo { get; set; }
		public int? MunicipioId { get; set; }
		public string? MunicipioNombre { get; set; }
		public string? MunicipioCodigo { get; set; }
	}
}