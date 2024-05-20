
using System.ComponentModel.DataAnnotations.Schema;
using Poli.Repositorio.Data.Model;
using Microsoft.AspNetCore.Identity;

namespace Poli.Repositorio.Data.Identity {
	public partial class AuthUser : IdentityUser<int> {
		public string FirstName { get; set; } = default!;
		public string LastName { get; set; } = default!;
		public string Adress { get; set; } = default!;
		public bool IsActive { get; set; } = true;
	}
}