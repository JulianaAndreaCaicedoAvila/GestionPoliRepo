using ESAP.Sirecec.Data.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ESAP.Sirecec.Data;

public class Seed
{

	private static void AddUser(int id, string firstName, string lastName, string email, ModelBuilder builder)
	{
		var hasher = new PasswordHasher<IdentityUser>();
		// 202305292212: UserManager.FindByEmailAsync returns null, but the user exists in the database -> https://stackoverflow.com/a/54196723
		builder.Entity<AuthUser>().HasData(new AuthUser
		{
			Id = id, // primary key
			UserName = email.Trim(),
			Email = email.Trim(),
			FirstName = firstName,
			LastName = lastName,
			NormalizedEmail = email.Trim().Normalize().ToUpperInvariant(), // Normalized
			NormalizedUserName = email.Trim().Normalize().ToUpperInvariant(), // Normalized
			EmailConfirmed = true,
			LockoutEnabled = false,
			SecurityStamp = Guid.NewGuid().ToString(),
			ConcurrencyStamp = Guid.NewGuid().ToString(),
			PasswordHash = hasher.HashPassword(null, "Acceso*2023")
		});
		builder.Entity<IdentityUserRole<int>>().HasData(new IdentityUserRole<int>
		{
			RoleId = 1,
			UserId = id
		});
	}

	internal static void Init(ModelBuilder builder)
	{
		// Seed
		builder.Entity<AuthRole>().HasData(new AuthRole { Id = 1, Name = "Super Administrador", NormalizedName = "SUPER_ADMINISTRADOR" });
		AddUser(1, "Diego", "Vargas", "dvargas@nemedi.com", builder);
		AddUser(2, "Diego", "Vargas", "diego.vargasv@esap.edu.co", builder);
		AddUser(3, "Camilo", "Rincón", "camilo.rincon@esap.edu.co", builder);
	}
}