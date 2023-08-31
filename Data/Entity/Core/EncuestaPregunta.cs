using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class EncuestaPregunta : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int? EncuestaId { get; set; }
		public int? PreguntaId { get; set; }
		public virtual Encuesta? Encuesta { get; set; }
		public virtual Pregunta? Curso { get; set; }

	}
}