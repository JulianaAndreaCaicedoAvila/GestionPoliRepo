using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.System
{

	public partial class Error : BaseEntity
	{
		[Key]
		[Column("ID")]
		public int Id { get; set; }
		[Column("UsuarioID")]
		public int UsuarioId { get; set; }
		[StringLength(4000)]
		public string? Url { get; set; }
		[StringLength(4000)]
		public string? Mensaje { get; set; }
		[StringLength(4000)]
		public string? Fuente { get; set; }
		[StringLength(4000)]
		public string? StackTrace { get; set; }
		[Column(TypeName = "datetime")]
		public DateTime? Fecha { get; set; }
	}

	public interface IError : IGenericRepository<Error>
	{
	}

	public class ErrorRepository : GenericRepository<Error>, IError
	{
		private readonly DataContext _db;

		public ErrorRepository(DataContext db, ILogger logger) : base(db, logger)
		{
			_db = db;
		}
	}
}