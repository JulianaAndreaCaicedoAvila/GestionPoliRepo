using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core {
	public partial class Entregable {
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string? Titulo { get; set; }
		public string? FechaSubida { get; set; }
		public string? Descripcion { get; set; }
		public string? EnlaceSharepoint { get; set; }
		public int IdDocente { get; set; }
		public string? Etiquetas { get; set; }
		public string? RutaGuardado { get; set; }

		// public virtual List<EncuestaPregunta>? Preguntas { get; set; } = new List<EncuestaPregunta>();
	}
}