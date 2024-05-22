using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core
{
	public partial class CursoEncuesta : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[ForeignKey("Curso")]
		public int? CursoId { get; set; }

		[ForeignKey("Encuesta")]
		public int? EncuestaId { get; set; }
		public int? MomentoId { get; set; }
		public virtual Curso? Curso { get; set; }
		public virtual Encuesta? Encuesta { get; set; }
	}
}