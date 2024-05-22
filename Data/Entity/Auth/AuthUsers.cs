using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongStock.Data.Identity {
	public class Usuarios {
		public int RoleId { get; set; }
		public string? RoleName { get; set; }
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? FirstName { get; set; } = default!;
		public string? LastName { get; set; } = default!;
		public string? Address { get; set; } = default!;
		public string? Email { get; set; } = default!;
		public string? PhoneNumber { get; set; } = default!;
		public bool IsActive { get; set; } = true;
		public bool EmailConfirmed { get; set; } = true;
		public string? PasswordHash { get; set; } = default!;
		public string? SecurityStamp { get; set; } = default!;
		public string? ConcurrencyStamp { get; set; } = default!;
	}
}