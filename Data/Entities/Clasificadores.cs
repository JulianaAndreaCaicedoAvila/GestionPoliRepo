using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	// [Keyless]
	public partial class Clasificadores : BaseEntity
	{
		public int? PadreTipoId { get; set; }
		public string? PadreTipoNombre { get; set; }
		public int PadreId { get; set; }
		public string? PadreNombre { get; set; }
		public int TipoId { get; set; }
		public string? TipoNombre { get; set; }
		[Key]
		public int Id { get; set; }
		public string? Nombre { get; set; }
		public string? Descripcion { get; set; }
		public int? Orden { get; set; }
		public int? Hijos { get; set; }
		public bool Activo { get; set; }
		public DateTime? CreadoEl { get; set; }
		public int? CreadoPor { get; set; }
		public DateTime? EditadoEl { get; set; }
		public int? EditadoPor { get; set; }
	}

	public interface IClasificadores : IGenericRepository<Clasificadores>
	{
	}

	public class ClasificadoresRepository : GenericRepository<Clasificadores>, IClasificadores
	{
		private readonly DataContext _db;

		public ClasificadoresRepository(DataContext db, ILogger logger) : base(db, logger)
		{
			_db = db;
		}
	}
}