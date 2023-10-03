using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class DepartamentoMunicipio : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int DepartamentoId { get; set; }
		public int MunicipioId { get; set; }
	}
}