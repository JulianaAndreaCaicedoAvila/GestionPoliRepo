
using System.ComponentModel.DataAnnotations.Schema;
using SongStock.Data.Model;
using Microsoft.AspNetCore.Identity;

namespace SongStock.Data.Identity {
	public partial class AuthUser : IdentityUser<int> {
		public string? FirstName { get; set; } = default!;
		public string? LastName { get; set; } = default!;
		public string? Address { get; set; } = default!;
		public bool? IsActive { get; set; } = true;
	}
}