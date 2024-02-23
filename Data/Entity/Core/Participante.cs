using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core {
	public partial class Participante : BaseEntity {
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		[ForeignKey("AuthUsers")]
		public int UsuarioId { get; set; }
		public int? TipoDocumentoId { get; set; }
		[NotMapped]
		public decimal DepartamentoId { get; set; }
		public int? MunicipioId { get; set; }
		public int? NivelEscolarId { get; set; }
		public int? EstadoCivilId { get; set; }
		public int? EntidadId { get; set; }
		public int? GeneroId { get; set; }
		public int? VulnerabilidadId { get; set; }
		public int? DiscapacidadId { get; set; }
		public int? CaracteristicaEsapId { get; set; }
		public int? CargoId { get; set; }
		public int? GrupoEtnicoId { get; set; }
		public int? TipoServidorPublicoId { get; set; }
		public int? TipoParticipanteId { get; set; }
		public string? DocumentoNumero { get; set; }
		public string? Nombres { get; set; }
		public string? Apellidos { get; set; }
		public DateTime? FechaNacimiento { get; set; }
		public string? Profesion { get; set; }
		public string? Telefono { get; set; }
		public string? Celular { get; set; }
		public string? Correo { get; set; }
		public string? Direccion { get; set; }
		public bool? Contratista { get; set; }
		public bool? HabeasData { get; set; }

		// TODO: 202402221929: Temporales
		public string? CargoActual { get; set; }
		public string? Entidad { get; set; }


	}
}