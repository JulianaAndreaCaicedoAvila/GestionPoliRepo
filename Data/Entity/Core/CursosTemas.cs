using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Poli.Repositorio.Data.Core
{
	// [Keyless]
	public partial class CursosTemas : BaseEntity
	{
		[Key]
		public int Id { get; set; }
		public int? CursoId { get; set; }
		public int? TemaId { get; set; }
		public string? TemaNombre { get; set; }
		public int? DependenciaId { get; set; }
		public string? DependenciaNombre { get; set; }
		public int? DocenteId { get; set; }
		public string? DocenteNombre { get; set; }
		public string? DocenteCorreo { get; set; }
		public string? LugarRealizacion { get; set; }
		public string? DireccionRealizacion { get; set; }

	}
}