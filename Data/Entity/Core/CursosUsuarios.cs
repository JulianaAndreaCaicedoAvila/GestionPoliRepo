using System.ComponentModel.DataAnnotations;

namespace ESAP.Sirecec.Data.Core
{
	public partial class CursosUsuarios
	{
		[Key]
		public int Id { get; set; }
		public int CursoId { get; set; }
		public string? CursoNombre { get; set; }
		public int? CursoEstadoId { get; set; }
		public string? CursoEstadoNombre { get; set; }
		public bool? CursoPublicado { get; set; }
		public string? CursoImagenCert { get; set; }
		public string? CursoImagen { get; set; }
		public string? CertCiudad { get; set; }
		public bool? CertCiudadVer { get; set; }
		public DateTime? CertFechaExpedicion { get; set; }
		public int UsuarioId { get; set; }
		public string? Name { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? Email { get; set; }
		public bool IsActive { get; set; }
		public int RoleId { get; set; }
		public string? RoleName { get; set; }

	}
}