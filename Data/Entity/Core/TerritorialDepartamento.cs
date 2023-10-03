using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class TerritorialDepartamento : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int TerritorialId { get; set; }
		public int DepartamentoId { get; set; }
	}
}