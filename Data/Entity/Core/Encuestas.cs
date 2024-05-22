using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Logging;

namespace SongStock.Data.Core
{
	public partial class Encuestas : Encuesta
	{
		public int? Preguntas { get; set; }
	}
}