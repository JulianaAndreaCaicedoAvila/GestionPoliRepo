using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class Curso : BaseEntity
	{

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string? Codigo { get; set; }
		public int? DependenciaId { get; set; }
		public int? TipoCursoId { get; set; }

		[ForeignKey("Nivel")]
		public int? NivelId { get; set; }

		// [ForeignKey("Escuela")]
		// public int? EscuelaId { get; set; 
		public int? TipoAsistenciaId { get; set; }

		[ForeignKey("Indicador")]
		public int? IndicadorId { get; set; }

		[ForeignKey("Municipio")]
		public int? MunicipioId { get; set; }

		[ForeignKey("Programa")]
		public int? ProgramaId { get; set; }
		public int? EstadoCursoId { get; set; }
		public int? ElaboradoPorId { get; set; }
		public int? CertificadoEtiquetaId { get; set; }
		public int? CupoTotal { get; set; }
		public int? CupoAula { get; set; }
		public string? Nombre { get; set; }
		public string? Descripcion { get; set; }
		public string? CodigoVerificacion { get; set; }
		public string? Responsable { get; set; }
		public string? CorreoElectronico { get; set; }
		public string? TelefonoContacto { get; set; }
		public int? HorasTotales { get; set; }
		public int? NumeroDias { get; set; }
		public int? PorcentajeValidoAsistencia { get; set; }
		public int? CantidadAulas { get; set; }
		public string? LugarRealizacion { get; set; }
		public DateTime FechaInicioInscripcion { get; set; }
		public DateTime FechaFinInscripcion { get; set; }
		public DateTime FechaInicio { get; set; }
		public DateTime FechaFin { get; set; }
		public DateTime HoraInicio { get; set; }
		public bool? Publicado { get; set; }
		public bool? JornadaManana { get; set; }
		public bool? JornadaTarde { get; set; }
		public bool? JornadaNoche { get; set; }
		public string? Objetivos { get; set; }
		public string? Contenidos { get; set; }
		public string? ImagenCertificado { get; set; }
		public string? ImagenCurso { get; set; }
		public string? CertificadoCiudad { get; set; }
		public bool? CertificadoVerCiudad { get; set; }
		public DateTime CertificadoFechaExpedicion { get; set; }
		// public virtual List<CursoAnexo>? Anexos { get; set; }
		// public virtual List<CursoEncuesta>? Encuestas { get; set; }
		// public virtual List<CursoFecha>? Fechas { get; set; }

	}
}