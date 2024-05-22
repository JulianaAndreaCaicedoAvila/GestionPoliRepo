using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core
{
	public partial class Nivel : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[ForeignKey("Escuela")]
		public int EscuelaId { get; set; }
		public string? Nombre { get; set; }
		public string? Descripcion { get; set; }
		public virtual List<Curso>? Cursos { get; set; } = new List<Curso>();
	}
}