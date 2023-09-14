using System.Diagnostics;
using ESAP.Sirecec.Data.Core;
using ESAP.Sirecec.Data.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data
{
	// https://docs.microsoft.com/en-us/aspnet/core/security/authentication/customize-identity-model?view=aspnetcore-6.0
	// public partial class DataContext : IdentityDbContext<User>
	public partial class DataContext : IdentityDbContext<AuthUser, AuthRole, int>
	{

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			// 201912252313: DbConfiguration -> https://docs.microsoft.com/en-us/ef/ef6/fundamentals/configuring/code-based
			// 202308251339: https://learn.microsoft.com/en-us/ef/core/logging-events-diagnostics/simple-logging
			// https://docs.microsoft.com/en-us/ef/ef6/fundamentals/logging-and-interception#setting-the-databaselogformatter
			// optionsBuilder.LogTo(message => Debug.WriteLine(message), (eventId, logLevel) => logLevel >= LogLevel.Debug
			// || eventId == RelationalEventId.ConnectionOpened
			// || eventId == RelationalEventId.CommandExecuted
			// || eventId == RelationalEventId.ConnectionClosed).EnableSensitiveDataLogging(true).EnableDetailedErrors();

			// Read appsettings.json
			// 202305291346: https://stackoverflow.com/a/71954443
			// 202305291353: https://stackoverflow.com/a/43619386
			// 202306151750: https://www.connectionstrings.com/store-and-read-connection-string-in-appsettings-json
			var configuration = new ConfigurationBuilder().AddJsonFile($"appsettings.json").AddJsonFile($"appsettings.dev.json", optional: true).Build();
			// var conn = "User Id=sirecec_v4;Password=sirecec_v4;Data Source=localhost:1521/ORCLPDB1;";
			// var conn = "User Id=DV_SIRECEC;Password=DVS1r3c3c4;Data Source=172.16.1.7:1523/SIRECEC4;";
			var conn = configuration.GetConnectionString("ConnStr");
			optionsBuilder.UseOracle(conn);
		}

		public DataContext() : base() { }
		public DataContext(DbContextOptions<DataContext> options) : base(options) { }
		public virtual DbSet<Core.Clasificador>? Clasificador { get; set; } = null!;
		public virtual DbSet<Core.ClasificadorTipo>? ClasificadorTipo { get; set; } = null!;
		public virtual DbSet<Core.Clasificadores>? Clasificadores { get; set; } = null!;
		public virtual DbSet<Core.Productos>? Productos { get; set; } = null!;
		public virtual DbSet<Identity.Users> Usuarios { get; set; } = null!;
		public virtual DbSet<Core.Modulo>? Modulo { get; set; } = null!;
		public virtual DbSet<Core.BancoPrograma>? BancoPrograma { get; set; } = null!;
		public virtual DbSet<Core.Nucleo>? Nucleo { get; set; } = null!;
		public virtual DbSet<Core.Programa>? Programa { get; set; } = null!;
		public virtual DbSet<Core.Escuela>? Escuela { get; set; } = null!;
		public virtual DbSet<Core.Nivel>? Nivel { get; set; } = null!;
		public virtual DbSet<Core.Producto>? Producto { get; set; } = null!;
		public virtual DbSet<Core.Indicador>? Indicador { get; set; } = null!;
		public virtual DbSet<Core.Tema>? Tema { get; set; } = null!;
		public virtual DbSet<Core.Participante>? Participante { get; set; } = null!;
		public virtual DbSet<Core.Curso>? Curso { get; set; } = null!;
		public virtual DbSet<Core.Documento>? Documento { get; set; } = null!;
		public virtual DbSet<Core.CursoAnexo>? CursoAnexo { get; set; } = null!;
		public virtual DbSet<Core.CursoEncuesta>? CursoEncuesta { get; set; } = null!;
		public virtual DbSet<Core.CursoFecha>? CursoFecha { get; set; } = null!;
		public virtual DbSet<Core.CursoTema>? CursoTema { get; set; } = null!;
		public virtual DbSet<Core.Encuesta>? Encuesta { get; set; } = null!;
		public virtual DbSet<Core.EncuestaPregunta>? EncuestaPregunta { get; set; } = null!;
		public virtual DbSet<Core.Pregunta>? Pregunta { get; set; } = null!;
		public virtual DbSet<Core.ValorGeneral>? ValorGeneral { get; set; } = null!;
		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			//202305292059: Seed
			// Seed.Init(builder);

			// Setting maximum identifier length to 30 characters; By default, it's set to 128.
			// https://docs.oracle.com/en/database/oracle/oracle-data-access-components/19.3/odpnt/EFCoreIdentifier.html
			// https://stackoverflow.com/questions/62275227/ora-00972-identifier-is-too-long-error-with-ef-core-2-2-code-first-migration
			builder.Model.SetMaxIdentifierLength(30);
			builder.Entity<AuthUser>().ToTable("AuthUsers"); //.Ignore(c => c.LockoutEndDateUtc);
			builder.Entity<AuthRole>().ToTable("AuthRoles");
			builder.Entity<Users>(entity => { entity.ToView("Usuarios"); });
			builder.Entity<IdentityUserRole<int>>().ToTable("AuthUserRoles");
			builder.Entity<IdentityUserClaim<int>>().ToTable("AuthUserClaims");
			builder.Entity<IdentityUserLogin<int>>().ToTable("AuthUserLogins");
			builder.Entity<IdentityRoleClaim<int>>().ToTable("AuthRoleClaims");
			builder.Entity<IdentityUserToken<int>>().ToTable("AuthUserTokens");
			builder.Entity<Core.Clasificador>(entity =>
			{
				entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
				entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
				entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
				entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
				entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				// entity.HasKey(e => e.TipoId);
				// entity.HasForeignKey(e => e.TipoId);
				// .HasPrincipalKey(e => e.Id);
				// entity.Property(e => e.Id).ValueGeneratedOnAdd();
				// entity.ToTable("Clasificador");
			});
			builder.Entity<Core.ClasificadorTipo>(entity =>
			{
				entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
				entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
				entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
				entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
				entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				// https://learn.microsoft.com/en-us/ef/core/modeling/relationships
				// entity.HasMany(e => e.Clasificadores)
				// .WithOne(e => e.ClasificadorTipo)
				// .HasForeignKey(e => e.TipoId)
				// .HasPrincipalKey(e => e.Id);
				// entity.ToTable("ClasificadorTipo");
			});
			builder.Entity<Core.Clasificadores>(entity => { entity.ToView("Clasificadores"); });
			builder.Entity<Core.Productos>(entity => { entity.ToView("Productos"); });
			builder.Entity<Core.Modulo>(entity =>
			{
				entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
				entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
				entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
				entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
				entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
			});
			builder.Entity<Core.BancoPrograma>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.Escuela>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.Nivel>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.Nucleo>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.Programa>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.Producto>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.Indicador>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.Tema>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.Participante>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.CursoAnexo>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.CursoEncuesta>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.CursoFecha>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.CursoTema>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.Curso>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.Encuesta>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.Documento>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.EncuestaPregunta>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.Pregunta>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
			builder.Entity<Core.ValorGeneral>(entity =>
				{
					entity.Property(e => e.CreadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.CreadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.EditadoEl).HasDefaultValueSql("CURRENT_TIMESTAMP");
					entity.Property(e => e.EditadoPor).HasDefaultValueSql("((1))");
					entity.Property(e => e.Activo).HasDefaultValueSql("((1))");
				});
		}
	}
}