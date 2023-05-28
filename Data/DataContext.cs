using ESAP.Sirecec.Data.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;


namespace ESAP.Sirecec.Data
{
	// https://docs.microsoft.com/en-us/aspnet/core/security/authentication/customize-identity-model?view=aspnetcore-6.0
	// public partial class DataContext : IdentityDbContext<User>
	public partial class DataContext : IdentityDbContext<Identity.AuthUser, AuthRole, int>
	{
		public virtual DbSet<Core.Clasificador>? Clasificador { get; set; } = null!;
		public virtual DbSet<Core.ClasificadorTipo> ClasificadorTipo { get; set; } = null!;
		public virtual DbSet<Core.Clasificadores> Clasificadores { get; set; } = null!;
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			var conn = "User Id=sirecec_v4;Password=sirecec_v4;Data Source=localhost:1521/ORCLPDB1;";
			optionsBuilder.UseOracle(conn);
		}
		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			// Setting maximum identifier length to 30 characters; By default, it's set to 128.
			// https://docs.oracle.com/en/database/oracle/oracle-data-access-components/19.3/odpnt/EFCoreIdentifier.html
			// https://stackoverflow.com/questions/62275227/ora-00972-identifier-is-too-long-error-with-ef-core-2-2-code-first-migration
			builder.Model.SetMaxIdentifierLength(30);
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
				// entity.ToTable("CLAS");
			});
			builder.Entity<Core.ClasificadorTipo>(entity =>
			{
				entity.Property(e => e.CreadoPor).HasDefaultValueSql("((0))");
				// https://learn.microsoft.com/en-us/ef/core/modeling/relationships
				entity.HasMany(e => e.Clasificadores)
					 .WithOne(e => e.ClasificadorTipo)
					 .HasForeignKey(e => e.TipoId)
					 .HasPrincipalKey(e => e.Id);
				// entity.ToTable("CLAS_TIPO");
			});
			builder.Entity<Core.Clasificadores>(entity => { entity.ToView("Clasificadores"); });

		}
	}


	// https://docs.microsoft.com/en-us/aspnet/core/security/authentication/customize-identity-model?view=aspnetcore-6.0
	// public partial class DataContext : IdentityDbContext<User>
	// public partial class DataContext : IdentityDbContext<Identity.AuthUser, AuthRole, int>
	// {
	// 	public virtual DbSet<Core.Clasificador>? Clasificador { get; set; } = null!;
	// 	public virtual DbSet<Core.ClasificadorTipo> ClasificadorTipo { get; set; } = null!;
	// 	// public virtual DbSet<Core.Clasificadores> Clasificadores { get; set; } = null!;
	// 	// protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	// 	// {
	// 	// 	var conn = "User Id=sirecec_v4;Password=sirecec_v4;Data Source=localhost:1521/ORCLPDB;";
	// 	// 	optionsBuilder.UseOracle(conn);
	// 	// }

	// 	public DataContext() : base() { }
	// 	public DataContext(DbContextOptions<DataContext> options) : base(options) { }

	// 	protected override void OnModelCreating(ModelBuilder builder)
	// 	{
	// 		base.OnModelCreating(builder);
	// 		// https://stackoverflow.com/questions/62275227/ora-00972-identifier-is-too-long-error-with-ef-core-2-2-code-first-migration
	// 		builder.Model.SetMaxIdentifierLength(30);
	// 		// Column name 'LockoutEndDateUtc' not valid -> Ignore field https://stackoverflow.com/a/38156276
	// 		builder.Entity<AuthUser>().ToTable("AuthUsers"); //.Ignore(c => c.LockoutEndDateUtc);
	// 		builder.Entity<AuthRole>().ToTable("AuthRoles");
	// 		builder.Entity<IdentityUserRole<int>>().ToTable("AuthUserRoles");
	// 		builder.Entity<IdentityUserClaim<int>>().ToTable("AuthUserClaims");
	// 		builder.Entity<IdentityUserLogin<int>>().ToTable("AuthUserLogins");
	// 		builder.Entity<IdentityRoleClaim<int>>().ToTable("AuthRoleClaims");
	// 		builder.Entity<IdentityUserToken<int>>().ToTable("AuthUserTokens");
	// 		builder.Entity<Core.Clasificador>(entity =>
	// 		{
	// 			entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
	// 			entity.Property(e => e.CreadoPor).HasDefaultValueSql("((0))");
	// 		});
	// 		builder.Entity<Core.ClasificadorTipo>(entity =>
	// 		{
	// 			entity.Property(e => e.CreadoPor).HasDefaultValueSql("((0))");
	// 			// https://learn.microsoft.com/en-us/ef/core/modeling/relationships
	// 			entity.HasMany(e => e.Clasificadores)
	// 				 .WithOne(e => e.ClasificadorTipo)
	// 				 .HasForeignKey(e => e.TipoId)
	// 				 .HasPrincipalKey(e => e.Id);
	// 		});
	// 		builder.Entity<Core.Clasificadores>(entity => { entity.ToView("Clasificadores"); });
	// 	}
	// 	public static DataContext Create()
	// 	{
	// 		return new DataContext();
	// 	}
	// }

	// public static readonly ILoggerFactory ConsoleLoggerFactory
	// 		  = LoggerFactory.Create(builder =>
	// 		  {
	// 			  builder
	// 			  .AddFilter((category, level) =>
	// 					category == DbLoggerCategory.Database.Command.Name && level == LogLevel.Debug)
	// 			  .AddConsole();
	// 		  });

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