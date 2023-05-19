
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace ESAP.Sirecec.Data.Identity
{
	public partial class AuthUser : IdentityUser<int>
	{
		public string FirstName { get; set; } = default!;
		public string LastName { get; set; } = default!;
		public bool IsActive { get; set; } = true;
		public int? CompanyId { get; set; } = default!;
		public int? DependenceId { get; set; } = default!;
	}
}