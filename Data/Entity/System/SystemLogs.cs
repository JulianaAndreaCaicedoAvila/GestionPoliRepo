using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Poli.Repositorio.Data.System {
    [Keyless]
    public partial class Logs : BaseEntity {
        [Column("ID")]
        public int Id { get; set; }
        [Column("UsuarioID")]
        public int UsuarioId { get; set; }
        [StringLength(256)]
        public string? Email { get; set; }
        [StringLength(513)]
        public string? Name { get; set; }
        [StringLength(100)]
        public string? Tabla { get; set; }
        [StringLength(50)]
        public string? Accion { get; set; }
        public string? Parametros { get; set; }
        [Column(TypeName = "text")]
        public string? Comando { get; set; }
        public int? Duracion { get; set; }
        [Column("FechaUTC", TypeName = "datetime")]
        public DateTime FechaUtc { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Fecha { get; set; }
    }

    public interface ILogs:IGenericRepository<Logs> {
    }
    
    public class LogsRepository : GenericRepository<Logs>, ILogs {
        private readonly DataContext _db;
        
        public LogsRepository(DataContext db, ILogger logger) : base(db, logger){
            _db = db;
        }
    }
}