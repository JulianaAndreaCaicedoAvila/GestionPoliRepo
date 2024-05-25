using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core {
	public partial class CodigoPlanDocente {
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string? Codigo { get; set; }
		public bool? Funcion { get; set; }
		public string? AccionPrincipal { get; set; }
		public string? Entregable { get; set; }

		// public virtual List<EncuestaPregunta>? Preguntas { get; set; } = new List<EncuestaPregunta>();
	}
}