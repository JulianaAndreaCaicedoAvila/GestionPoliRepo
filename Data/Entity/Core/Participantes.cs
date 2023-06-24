using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class Participantes : BaseEntity
	{
		[Key]
		public int Id { get; set; }
		public string? TipoDocumento { get; set; }
		public string? NumeroDocumento { get; set; }
		public string? Nombres { get; set; }
		public string? Apellidos { get; set; }
		public DateTime FechaNacimiento { get; set; }
		public string? NivelEscolar { get; set; }
		public string? EstadoCivil { get; set; }
		public string? Profesion { get; set; }
		public string? Contacto { get; set; }
		public string? Correo { get; set; }
		public string? Direccion { get; set; }
		public string? Departamento { get; set; }
		public string? Municipio { get; set; }
		public string? Entidad { get; set; }
		public string? Cargo { get; set; }
		public string? Participante { get; set; }
		public string? ServidorPublico { get; set; }
		public string? Vulnerabilidad { get; set; }
		public string? Discapacidad { get; set; }
		public string? GrupoEtnico { get; set; }
		public string? RolESAP { get; set; }

	}
}