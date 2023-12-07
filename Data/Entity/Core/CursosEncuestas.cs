using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class CursosEncuestas : BaseEntity
	{
		[Key]
		public int Id { get; set; }
		public int CursoId { get; set; }
		public string? CursoNombre { get; set; }
		public int MomentoId { get; set; }
		public string? MomentoNombre { get; set; }
		public int? EncuestaId { get; set; }
		public string? Titulo { get; set; }
		public string? Descripcion { get; set; }
		public int? Preguntas { get; set; }
	}
}
