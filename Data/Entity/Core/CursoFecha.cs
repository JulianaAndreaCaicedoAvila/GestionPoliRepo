using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core {
	public partial class CursoFecha : BaseEntity {
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[ForeignKey("Curso")]
		public int? CursoId { get; set; }
		public DateTime? FechaClase { get; set; }
		public int? Ponderacion { get; set; }
		public virtual Curso? Curso { get; set; }
	}
}