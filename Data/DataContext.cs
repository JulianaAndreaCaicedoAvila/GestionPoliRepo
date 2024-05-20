using Poli.Repositorio.Data.Core;
using Poli.Repositorio.Data.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Poli.Repositorio.Data {
	public partial class DataContext : IdentityDbContext<AuthUser, AuthRole, int> {
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
			var conn2 = @"Server=.\localhost;Database=polirepo;User Id=JUAND;Password=20Bolivar20*";
			var conn = @"Server=localhost;Port=3307;Database=songstock_bd;Uid=JUAND;Pwd=20Bolivar20*;SslMode=Preferred;";
			var conn1 = @"data source=.\JUANDIEGO;initial catalog=PoliRepositorio;persist security info=True;Integrated Security=SSPI;";
			var conn3 = @"server=localhost:3307;uid=JUAND;pwd=20Bolivar20*;database=songstock_bd";
			// optionsBuilder.UseSqlServer(conn);
			optionsBuilder.UseMySql(conn, ServerVersion.AutoDetect(conn));
		}

		public DataContext() : base() { }
		public DataContext(DbContextOptions<DataContext> options) : base(options) { }
		public virtual DbSet<Curso>? Curso { get; set; } = null!;
		public virtual DbSet<Cursos>? Cursos { get; set; } = null!;
		public virtual DbSet<Users> Usuarios { get; set; } = null!;
		public virtual DbSet<Escuela>? Escuela { get; set; } = null!;
		public virtual DbSet<Envio>? Envio { get; set; } = null!;

		protected override void OnModelCreating(ModelBuilder builder) {
			base.OnModelCreating(builder);
			builder.Model.SetMaxIdentifierLength(30);

			// Identity
			builder.Entity<AuthUser>().ToTable("AuthUsers"); //.Ignore(c => c.LockoutEndDateUtc);
			builder.Entity<AuthRole>().ToTable("AuthRoles");
			builder.Entity<IdentityUserRole<int>>().ToTable("AuthUserRoles");
			builder.Entity<IdentityUserClaim<int>>().ToTable("AuthUserClaims");
			builder.Entity<IdentityUserLogin<int>>().ToTable("AuthUserLogins");
			builder.Entity<IdentityRoleClaim<int>>().ToTable("AuthRoleClaims");
			builder.Entity<IdentityUserToken<int>>().ToTable("AuthUserTokens");

			// Vistas
			builder.Entity<Cursos>(entity => { entity.ToView("Cursos"); });
		}

	}
}
