using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Poli.Repositorio.Data.System {
    [Table("Log", Schema = "System")]
    public partial class Log : BaseEntity {
        [Key]
        [Column("ID")]
        public int Id { get; set; }
        [Column("UsuarioID")]
        public int UsuarioId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime Fecha { get; set; }
        [StringLength(100)]
        public string? Tabla { get; set; }
        [StringLength(50)]
        public string? Accion { get; set; }
        public string? Parametros { get; set; }
        [Column(TypeName = "text")]
        public string? Comando { get; set; }
        public int? Duracion { get; set; }
    }

    public interface ILog:IGenericRepository<Log> {
    }
    
    public class LogRepository : GenericRepository<Log>, ILog {
        private readonly DataContext _db;
        
        public LogRepository(DataContext db, ILogger logger) : base(db, logger){
            _db = db;
        }
    }
}