using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core {
	public partial class Album {
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string? Nombre { get; set; }
		public string? Descripcion { get; set; }

		// public virtual List<EncuestaPregunta>? Preguntas { get; set; } = new List<EncuestaPregunta>();
	}
}