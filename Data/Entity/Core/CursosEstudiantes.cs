using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class CursosEstudiantes : BaseEntity
	{
		[Key]
		public int Id { get; set; }
		public int CodigoCurso { get; set; }
		public string? NombreCurso { get; set; }
		public string? Tipo { get; set; }
		public int Identificacion { get; set; }
		public string? NombreParticipante { get; set; }
		public string? ApellidosParticipante { get; set; }
	}
}