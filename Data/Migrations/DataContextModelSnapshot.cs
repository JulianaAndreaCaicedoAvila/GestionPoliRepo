﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Poli.Repositorio.Data;

#nullable disable

namespace Poli.Repositorio.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.28")
                .HasAnnotation("Relational:MaxIdentifierLength", 30);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AuthRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AuthUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AuthUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AuthUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Value")
                        .HasColumnType("longtext");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AuthUserTokens", (string)null);
                });

            modelBuilder.Entity("Poli.Repositorio.Data.Core.Curso", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool?>("Activo")
                        .HasColumnType("tinyint(1)");

                    b.Property<int?>("CantidadAulas")
                        .HasColumnType("int");

                    b.Property<string>("CertificadoCiudad")
                        .HasColumnType("longtext");

                    b.Property<int?>("CertificadoEtiquetaId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CertificadoFechaExpedicion")
                        .HasColumnType("datetime(6)");

                    b.Property<bool?>("CertificadoVerCiudad")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Codigo")
                        .HasColumnType("longtext");

                    b.Property<string>("CodigoVerificacion")
                        .HasColumnType("longtext");

                    b.Property<string>("Contenidos")
                        .HasColumnType("longtext");

                    b.Property<string>("CorreoElectronico")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("CreadoEl")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("CreadoPor")
                        .HasColumnType("int");

                    b.Property<int?>("CupoAula")
                        .HasColumnType("int");

                    b.Property<int?>("CupoTotal")
                        .HasColumnType("int");

                    b.Property<int?>("DependenciaId")
                        .HasColumnType("int");

                    b.Property<string>("Descripcion")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("EditadoEl")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("EditadoPor")
                        .HasColumnType("int");

                    b.Property<int?>("ElaboradoPorId")
                        .HasColumnType("int");

                    b.Property<int?>("EstadoCursoId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaFin")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("FechaFinInscripcion")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("FechaInicio")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("FechaInicioInscripcion")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("HoraInicio")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("HorasTotales")
                        .HasColumnType("int");

                    b.Property<string>("ImagenCertificado")
                        .HasColumnType("longtext");

                    b.Property<string>("ImagenCurso")
                        .HasColumnType("longtext");

                    b.Property<int?>("IndicadorId")
                        .HasColumnType("int");

                    b.Property<bool?>("JornadaManana")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("JornadaNoche")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("JornadaTarde")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("LugarRealizacion")
                        .HasColumnType("longtext");

                    b.Property<int?>("MunicipioId")
                        .HasColumnType("int");

                    b.Property<int?>("NivelId")
                        .HasColumnType("int");

                    b.Property<string>("Nombre")
                        .HasColumnType("longtext");

                    b.Property<int?>("NumeroDias")
                        .HasColumnType("int");

                    b.Property<string>("Objetivos")
                        .HasColumnType("longtext");

                    b.Property<int?>("Orden")
                        .HasColumnType("int");

                    b.Property<int?>("PorcentajeValidoAsistencia")
                        .HasColumnType("int");

                    b.Property<int?>("ProgramaId")
                        .HasColumnType("int");

                    b.Property<bool?>("Publicado")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Responsable")
                        .HasColumnType("longtext");

                    b.Property<string>("TelefonoContacto")
                        .HasColumnType("longtext");

                    b.Property<int?>("TipoAsistenciaId")
                        .HasColumnType("int");

                    b.Property<int?>("TipoCursoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Curso");
                });

            modelBuilder.Entity("Poli.Repositorio.Data.Core.Cursos", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool?>("Activo")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("BancoFechaInicio")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("BancoId")
                        .HasColumnType("int");

                    b.Property<string>("BancoNombre")
                        .HasColumnType("longtext");

                    b.Property<int?>("CantidadAulas")
                        .HasColumnType("int");

                    b.Property<string>("CertificadoCiudad")
                        .HasColumnType("longtext");

                    b.Property<int?>("CertificadoEtiquetaId")
                        .HasColumnType("int");

                    b.Property<string>("CertificadoEtiquetaNombre")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CertificadoFechaExpedicion")
                        .HasColumnType("datetime(6)");

                    b.Property<bool?>("CertificadoVerCiudad")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Codigo")
                        .HasColumnType("longtext");

                    b.Property<string>("CodigoVerificacion")
                        .HasColumnType("longtext");

                    b.Property<string>("Contenidos")
                        .HasColumnType("longtext");

                    b.Property<string>("CorreoElectronico")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("CreadoEl")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("CreadoPor")
                        .HasColumnType("int");

                    b.Property<int?>("CupoAula")
                        .HasColumnType("int");

                    b.Property<int?>("CupoTotal")
                        .HasColumnType("int");

                    b.Property<int?>("DepartamentoId")
                        .HasColumnType("int");

                    b.Property<string>("DepartamentoNombre")
                        .HasColumnType("longtext");

                    b.Property<int?>("DependenciaId")
                        .HasColumnType("int");

                    b.Property<string>("DependenciaNombre")
                        .HasColumnType("longtext");

                    b.Property<string>("Descripcion")
                        .HasColumnType("longtext");

                    b.Property<int>("Documentos")
                        .HasColumnType("int");

                    b.Property<DateTime?>("EditadoEl")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("EditadoPor")
                        .HasColumnType("int");

                    b.Property<int?>("ElaboradoPorId")
                        .HasColumnType("int");

                    b.Property<string>("ElaboradoPorNombre")
                        .HasColumnType("longtext");

                    b.Property<int>("Encuestas")
                        .HasColumnType("int");

                    b.Property<int?>("EscuelaId")
                        .HasColumnType("int");

                    b.Property<string>("EscuelaNombre")
                        .HasColumnType("longtext");

                    b.Property<int?>("EstadoCursoId")
                        .HasColumnType("int");

                    b.Property<string>("EstadoCursoNombre")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("FechaFin")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("FechaFinInscripcion")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("FechaInicio")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("FechaInicioInscripcion")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("Fechas")
                        .HasColumnType("int");

                    b.Property<DateTime>("HoraInicio")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("HorasTotales")
                        .HasColumnType("int");

                    b.Property<string>("ImagenCertificado")
                        .HasColumnType("longtext");

                    b.Property<string>("ImagenCurso")
                        .HasColumnType("longtext");

                    b.Property<int>("Imagenes")
                        .HasColumnType("int");

                    b.Property<int?>("IndicadorId")
                        .HasColumnType("int");

                    b.Property<string>("IndicadorNombre")
                        .HasColumnType("longtext");

                    b.Property<bool?>("InscripcionesAbiertas")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("JornadaManana")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("JornadaNoche")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("JornadaTarde")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("LugarRealizacion")
                        .HasColumnType("longtext");

                    b.Property<int?>("MunicipioId")
                        .HasColumnType("int");

                    b.Property<string>("MunicipioNombre")
                        .HasColumnType("longtext");

                    b.Property<int?>("NivelId")
                        .HasColumnType("int");

                    b.Property<string>("NivelNombre")
                        .HasColumnType("longtext");

                    b.Property<string>("Nombre")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("NucleoFechaInicio")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("NucleoId")
                        .HasColumnType("int");

                    b.Property<string>("NucleoNombre")
                        .HasColumnType("longtext");

                    b.Property<int?>("NumeroDias")
                        .HasColumnType("int");

                    b.Property<string>("Objetivos")
                        .HasColumnType("longtext");

                    b.Property<int?>("Orden")
                        .HasColumnType("int");

                    b.Property<int?>("PaisId")
                        .HasColumnType("int");

                    b.Property<string>("PaisIso1")
                        .HasColumnType("longtext");

                    b.Property<string>("PaisIso2")
                        .HasColumnType("longtext");

                    b.Property<int>("Participantes")
                        .HasColumnType("int");

                    b.Property<int?>("PorcentajeValidoAsistencia")
                        .HasColumnType("int");

                    b.Property<int?>("ProductoId")
                        .HasColumnType("int");

                    b.Property<string>("ProductoNombre")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("ProgramaFechaInicio")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("ProgramaId")
                        .HasColumnType("int");

                    b.Property<string>("ProgramaNombre")
                        .HasColumnType("longtext");

                    b.Property<bool?>("Publicado")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Responsable")
                        .HasColumnType("longtext");

                    b.Property<string>("TelefonoContacto")
                        .HasColumnType("longtext");

                    b.Property<int>("Temas")
                        .HasColumnType("int");

                    b.Property<int?>("TerritorialId")
                        .HasColumnType("int");

                    b.Property<string>("TerritorialNombre")
                        .HasColumnType("longtext");

                    b.Property<int?>("TipoAsistenciaId")
                        .HasColumnType("int");

                    b.Property<string>("TipoAsistenciaNombre")
                        .HasColumnType("longtext");

                    b.Property<int?>("TipoCursoId")
                        .HasColumnType("int");

                    b.Property<string>("TipoCursoNombre")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToView("Cursos");
                });

            modelBuilder.Entity("Poli.Repositorio.Data.Identity.AuthRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AuthRoles", (string)null);
                });

            modelBuilder.Entity("Poli.Repositorio.Data.Identity.AuthUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<int?>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<int?>("DependenceId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<int?>("ProjectId")
                        .HasColumnType("int");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<int?>("TerritorialId")
                        .HasColumnType("int");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AuthUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("Poli.Repositorio.Data.Identity.AuthRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("Poli.Repositorio.Data.Identity.AuthUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("Poli.Repositorio.Data.Identity.AuthUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.HasOne("Poli.Repositorio.Data.Identity.AuthRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Poli.Repositorio.Data.Identity.AuthUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("Poli.Repositorio.Data.Identity.AuthUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
