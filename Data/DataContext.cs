﻿using System.ComponentModel;
using System.Diagnostics;
using System.Reflection;
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
	public partial class DataContext : IdentityDbContext<AuthUser, AuthRole, int>
	{
		public DataContext() : base() { }

		// protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		// {
		// 	var configuration = new ConfigurationBuilder().AddJsonFile($"appsettings.json").AddJsonFile($"appsettings.dev.json", optional: true).Build();
		// 	var conn = configuration.GetConnectionString("ConnStr");
		// 	optionsBuilder.UseOracle(conn);
		// }
		public DataContext(DbContextOptions<DataContext> options) : base(options) { }
		public virtual DbSet<BancoPrograma>? BancoPrograma { get; set; } = null!;
		public virtual DbSet<BancoProgramaNucleo>? BancoProgramaNucleo { get; set; } = null!;
		public virtual DbSet<BancoProgramasNucleos>? BancoProgramasNucleos { get; set; } = null!;
		public virtual DbSet<Clasificador>? Clasificador { get; set; } = null!;
		public virtual DbSet<Clasificadores>? Clasificadores { get; set; } = null!;
		public virtual DbSet<ClasificadorTipo>? ClasificadorTipo { get; set; } = null!;
		public virtual DbSet<Curso>? Curso { get; set; } = null!;
		public virtual DbSet<Cursos>? Cursos { get; set; } = null!;
		public virtual DbSet<CursosTemas>? CursosTemas { get; set; } = null!;
		public virtual DbSet<CursoAnexo>? CursoAnexo { get; set; } = null!;
		public virtual DbSet<CursoEncuesta>? CursoEncuesta { get; set; } = null!;
		public virtual DbSet<CursosEncuestas>? CursosEncuestas { get; set; } = null!;
		public virtual DbSet<CursoFecha>? CursoFecha { get; set; } = null!;
		public virtual DbSet<CursoTema>? CursoTema { get; set; } = null!;
		public virtual DbSet<CursoDocumento>? CursoDocumento { get; set; } = null!;
		public virtual DbSet<Departamento>? Departamento { get; set; } = null!;
		public virtual DbSet<DepartamentoMunicipio>? DepartamentoMunicipio { get; set; } = null!;
		public virtual DbSet<DepartamentosMunicipios>? DepartamentosMunicipios { get; set; } = null!;
		public virtual DbSet<Documento>? Documento { get; set; } = null!;
		public virtual DbSet<Encuesta>? Encuesta { get; set; } = null!;
		public virtual DbSet<Encuestas>? Encuestas { get; set; } = null!;
		public virtual DbSet<EncuestaPregunta>? EncuestaPregunta { get; set; } = null!;
		public virtual DbSet<Escuela>? Escuela { get; set; } = null!;
		public virtual DbSet<Indicador>? Indicador { get; set; } = null!;
		public virtual DbSet<Modulo>? Modulo { get; set; } = null!;
		public virtual DbSet<Municipio>? Municipio { get; set; } = null!;
		public virtual DbSet<Municipios>? Municipios { get; set; } = null!;
		public virtual DbSet<Nivel>? Nivel { get; set; } = null!;
		public virtual DbSet<Nucleo>? Nucleo { get; set; } = null!;
		public virtual DbSet<NucleoPrograma>? NucleoPrograma { get; set; } = null!;
		public virtual DbSet<NucleosProgramas>? NucleosProgramas { get; set; } = null!;
		public virtual DbSet<Pais>? Pais { get; set; } = null!;
		public virtual DbSet<Participante>? Participante { get; set; } = null!;
		public virtual DbSet<Pregunta>? Pregunta { get; set; } = null!;
		public virtual DbSet<Producto>? Producto { get; set; } = null!;
		public virtual DbSet<ProductoIndicador>? ProductoIndicador { get; set; } = null!;
		public virtual DbSet<Productos>? Productos { get; set; } = null!;
		public virtual DbSet<ProductosIndicadores>? ProductosIndicadores { get; set; } = null!;
		public virtual DbSet<Programa>? Programa { get; set; } = null!;
		public virtual DbSet<Tema>? Tema { get; set; } = null!;
		public virtual DbSet<Temas>? Temas { get; set; } = null!;
		public virtual DbSet<TerritorialDepartamento>? TerritorialDepartamento { get; set; } = null!;
		public virtual DbSet<TerritorialesDepartamentos>? TerritorialesDepartamentos { get; set; } = null!;
		public virtual DbSet<Users> Usuarios { get; set; } = null!;
		public virtual DbSet<ValorGeneral>? ValorGeneral { get; set; } = null!;
		protected override void ConfigureConventions(ModelConfigurationBuilder confBuilder)
		{
			// confBuilder.Conventions.Add(new AttributeToColumnAnnotationConvention<SqlDefaultValueAttribute, string>("SqlDefaultValue", (p, attributes) => attributes.Single().DefaultValue));
		}
		protected override void OnModelCreating(ModelBuilder builder)
		{
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
			builder.Entity<Users>(entity => { entity.ToView("Usuarios"); });
			builder.Entity<Cursos>(entity => { entity.ToView("Cursos"); });
			builder.Entity<CursosTemas>(entity => { entity.ToView("CursosTemas"); });
			builder.Entity<CursosEncuestas>(entity => { entity.ToView("CursosEncuestas"); });
			builder.Entity<Temas>(entity => { entity.ToView("Temas"); });
			builder.Entity<Municipios>(entity => { entity.ToView("Municipios"); });
			builder.Entity<BancoProgramasNucleos>(entity => { entity.ToView("BancoProgramasNucleos"); });
			builder.Entity<Clasificadores>(entity => { entity.ToView("Clasificadores"); });
			builder.Entity<DepartamentosMunicipios>(entity => { entity.ToView("DepartamentosMunicipios"); });
			builder.Entity<NucleosProgramas>(entity => { entity.ToView("NucleosProgramas"); });
			builder.Entity<Productos>(entity => { entity.ToView("Productos"); });
			builder.Entity<ProductosIndicadores>(entity => { entity.ToView("ProductosIndicadores"); });
			builder.Entity<TerritorialesDepartamentos>(entity => { entity.ToView("TerritorialesDepartamentos"); });
			builder.Entity<Encuestas>(entity => { entity.ToView("Encuestas"); });
		}
	}
}
