using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Poli.Repositorio.Data.Core {
	// [Keyless]
	public partial class Cursos : BaseEntity {
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string? Codigo { get; set; }
		public int? DependenciaId { get; set; }
		public string? DependenciaNombre { get; set; }
		public string? TipoCursoNombre { get; set; }
		public string? NivelNombre { get; set; }
		public string? EscuelaNombre { get; set; }
		public int? TipoCursoId { get; set; }
		public int? EscuelaId { get; set; }
		public int? NivelId { get; set; }
		public int? TipoAsistenciaId { get; set; }
		public string? TipoAsistenciaNombre { get; set; }
		public int? IndicadorId { get; set; }
		public string? IndicadorNombre { get; set; }
		public int? ElaboradoPorId { get; set; }
		public string? ElaboradoPorNombre { get; set; }
		public int? ProductoId { get; set; }
		public string? ProductoNombre { get; set; }
		public int? MunicipioId { get; set; }
		public int? DepartamentoId { get; set; }
		public int? TerritorialId { get; set; }
		public int? PaisId { get; set; }
		public string? MunicipioNombre { get; set; }
		public string? DepartamentoNombre { get; set; }
		public string? TerritorialNombre { get; set; }
		public string? PaisIso1 { get; set; }
		public string? PaisIso2 { get; set; }
		public int? ProgramaId { get; set; }
		public int? NucleoId { get; set; }
		public string? ProgramaNombre { get; set; }
		public string? NucleoNombre { get; set; }
		public int? BancoId { get; set; }
		public string? BancoNombre { get; set; }
		public int? EstadoCursoId { get; set; }
		public string? EstadoCursoNombre { get; set; }
		public int? CertificadoEtiquetaId { get; set; }
		public string? CertificadoEtiquetaNombre { get; set; }
		public string? Nombre { get; set; }
		public string? Descripcion { get; set; }
		public string? CodigoVerificacion { get; set; }
		public string? Responsable { get; set; }
		public string? CorreoElectronico { get; set; }
		public string? TelefonoContacto { get; set; }
		public int? HorasTotales { get; set; }
		public int? NumeroDias { get; set; }
		public int? PorcentajeValidoAsistencia { get; set; }
		public string? LugarRealizacion { get; set; }
		public DateTime FechaInicioInscripcion { get; set; }
		public DateTime ProgramaFechaInicio { get; set; }
		public DateTime NucleoFechaInicio { get; set; }
		public DateTime BancoFechaInicio { get; set; }
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
		public int Documentos { get; set; }
		public int Imagenes { get; set; }
		public int Encuestas { get; set; }
		public int Fechas { get; set; }
		public int Temas { get; set; }
		public int? CantidadAulas { get; set; }
		public int? CupoAula { get; set; }
		public int? CupoTotal { get; set; }
		public int Participantes { get; set; }
		public bool? InscripcionesAbiertas { get; set; }

	}
}