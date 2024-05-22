using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core
{
	public partial class Pregunta : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		// public int? EncuestaId { get; set; }
		public string? Titulo { get; set; }
		// public string? Descripcion { get; set; }
	}
}