using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class ConsultaDoc : BaseEntity
	{
		[Key]
		public int Id { get; set; }
		public string? Evento { get; set; }
		public DateTime FechaInicio { get; set; }
		public virtual List<Modulo>? Modulos { get; set; }
		public virtual List<Tema>? Temas { get; set; }
		public string? Docente { get; set; }

	}
}