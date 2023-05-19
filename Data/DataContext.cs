using ESAP.Sirecec.Data.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ESAP.Sirecec.Data
{
	// https://docs.microsoft.com/en-us/aspnet/core/security/authentication/customize-identity-model?view=aspnetcore-6.0
	// public partial class DataContext : IdentityDbContext<User>
	public partial class DataContext : IdentityDbContext<Identity.AuthUser, AuthRole, int>
	{
		public virtual DbSet<Core.Clasificador> Clasificador { get; set; } = null!;
		public virtual DbSet<Core.ClasificadorTipo> ClasificadorTipo { get; set; } = null!;
		public virtual DbSet<Core.Clasificadores> Clasificadores { get; set; } = null!;
		public DataContext() : base() { }
		public DataContext(DbContextOptions<DataContext> options) : base(options) { }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
			// https://stackoverflow.com/questions/62275227/ora-00972-identifier-is-too-long-error-with-ef-core-2-2-code-first-migration
			builder.Model.SetMaxIdentifierLength(30);
			// Column name 'LockoutEndDateUtc' not valid -> Ignore field https://stackoverflow.com/a/38156276
			builder.Entity<AuthUser>().ToTable("AuthUsers"); //.Ignore(c => c.LockoutEndDateUtc);
			builder.Entity<AuthRole>().ToTable("AuthRoles");
			builder.Entity<IdentityUserRole<int>>().ToTable("AuthUserRoles");
			builder.Entity<IdentityUserClaim<int>>().ToTable("AuthUserClaims");
			builder.Entity<IdentityUserLogin<int>>().ToTable("AuthUserLogins");
			builder.Entity<IdentityRoleClaim<int>>().ToTable("AuthRoleClaims");
			builder.Entity<IdentityUserToken<int>>().ToTable("AuthUserTokens");
			builder.Entity<Core.Clasificador>(entity =>
			{
				entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				entity.Property(e => e.CreadoPor).HasDefaultValueSql("((0))");
			});
			builder.Entity<Core.ClasificadorTipo>(entity =>
			{
				entity.Property(e => e.CreadoPor).HasDefaultValueSql("((0))");
				// https://learn.microsoft.com/en-us/ef/core/modeling/relationships
				entity.HasMany(e => e.Clasificadores)
					 .WithOne(e => e.ClasificadorTipo)
					 .HasForeignKey(e => e.TipoId)
					 .HasPrincipalKey(e => e.Id);
			});
			builder.Entity<Core.Clasificadores>(entity => { entity.ToView("Clasificadores"); });
		}
		public static DataContext Create()
		{
			return new DataContext();
		}
	}

	// 201912252313:
	// https://docs.microsoft.com/en-us/ef/ef6/fundamentals/configuring/code-based
	// https://docs.microsoft.com/en-us/ef/ef6/fundamentals/logging-and-interception#setting-the-databaselogformatter
	// public class DbConfig : DbConfiguration
	// {
	// 	public DbConfig()
	// 	{
	// 		DbInterception.Add(new DbLogger());
	// 		//SetDatabaseLogFormatter((context, writeAction) => new Logger(context, writeAction));
	// 	}
	// }
}