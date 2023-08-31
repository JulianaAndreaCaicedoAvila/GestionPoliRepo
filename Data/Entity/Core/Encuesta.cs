using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class Encuesta : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int? TipoEncuestaId { get; set; }
		public string? Titulo { get; set; }
		public string? Descripcion { get; set; }
		public virtual List<EncuestaPregunta>? Preguntas { get; set; } = new List<EncuestaPregunta>();

	}
}