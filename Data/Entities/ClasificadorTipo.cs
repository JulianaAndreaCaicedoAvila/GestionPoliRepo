using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class ClasificadorTipo : BaseEntity
	{
		// public ClasificadorTipo() {
		// 	Clasificador = new HashSet<Clasificador>();
		// }

		[Key]
		public int Id { get; set; }

		public string? Nombre { get; set; }

		public string? Descripcion { get; set; }

		public DateTime? CreadoEl { get; set; }
		public int? CreadoPor { get; set; }

		public DateTime? EditadoEl { get; set; }
		public int? EditadoPor { get; set; }
		public virtual ICollection<Clasificador>? Clasificadores { get; set; }

		// [InverseProperty("Tipo")]
		// public virtual ICollection<Clasificador> Clasificador { get; set; }
	}

	public interface IClasificadorTipo : IGenericRepository<ClasificadorTipo>
	{
	}

	public class ClasificadorTipoRepository : GenericRepository<ClasificadorTipo>, IClasificadorTipo
	{
		private readonly DataContext _db;

		public ClasificadorTipoRepository(DataContext db, ILogger logger) : base(db, logger)
		{
			_db = db;
		}
	}
}