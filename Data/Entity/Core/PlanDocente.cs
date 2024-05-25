using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core {
	public partial class PlanDocente {
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string? Codigo { get; set; }
		public string? Nombre { get; set; }
		public bool? Estado { get; set; }
		public string? Comentario { get; set; }

		// public virtual List<EncuestaPregunta>? Preguntas { get; set; } = new List<EncuestaPregunta>();
	}
}