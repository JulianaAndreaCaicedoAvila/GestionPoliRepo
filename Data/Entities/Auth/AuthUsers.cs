using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ESAP.Sirecec.Data.Identity
{
	public class Users
	{

		[Key]
		public int Id { get; set; }
		public int RoleId { get; set; }
		public string? RoleName { get; set; }
		public int? CompanyId { get; set; }
		public string? CompanyName { get; set; }
		public string? CompanyAcronym { get; set; }
		public int? DependenceId { get; set; }
		public string? DependenceName { get; set; }
		public string? Name { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public virtual string? Email { get; set; }
		public virtual string? UserName { get; set; }
		public virtual bool EmailConfirmed { get; set; }
		public virtual string? PasswordHash { get; set; }
		public virtual string? SecurityStamp { get; set; }
		public virtual string? PhoneNumber { get; set; }
		public virtual bool PhoneNumberConfirmed { get; set; }
		public virtual bool TwoFactorEnabled { get; set; }
		public virtual DateTime? LockoutEnd { get; set; }
		public virtual bool LockoutEnabled { get; set; }
		public virtual int AccessFailedCount { get; set; }
		public virtual string? ConcurrencyStamp { get; set; }
		public virtual string? NormalizedEmail { get; set; }
		public virtual string? NormalizedUserName { get; set; }
		public bool IsActive { get; set; }
	}
}