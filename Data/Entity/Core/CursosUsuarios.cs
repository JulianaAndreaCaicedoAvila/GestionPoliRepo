using System.ComponentModel.DataAnnotations;

namespace ESAP.Sirecec.Data.Core
{
	public partial class CursosUsuarios : BaseEntity
	{
		[Key]
		public int Id { get; set; }
		public int CursoId { get; set; }
		public string? CursoNombre { get; set; }
		public int? CursoEstadoId { get; set; }
		public string? CursoEstadoNombre { get; set; }
		public bool? CursoPublicado { get; set; }
		public string? CursoImagenCertificado { get; set; }
		public string? CursoImagen { get; set; }
		public string? CursoCertificadoCiudad { get; set; }
		public bool? CursoCertificadoCiudadVer { get; set; }
		public string? CursoCertificadoFechaExpedicion { get; set; }
		public int UsuarioId { get; set; }
		public string? Name { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public bool IsActive { get; set; }
		public int RoleId { get; set; }
		public string? RoleName { get; set; }

	}
}