using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core
{
	public partial class CursoAnexo : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[ForeignKey("Curso")]
		public int CursoId { get; set; }
		public int TipoId { get; set; } // Imagen o documento
		public int AnexoId { get; set; }
	}
}