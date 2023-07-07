using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class CursoTema : BaseEntity
	{
		[Key]
		public int Id { get; set; }
		public int CursoId { get; set; }
		public int TemaId { get; set; }
		public int DocenteId { get; set; }
		public string? LugarRealizacion { get; set; }
		public string? DireccionRealizacion { get; set; }
		public virtual Tema? Tema { get; set; }
		public virtual Curso? Curso { get; set; }
	}
}