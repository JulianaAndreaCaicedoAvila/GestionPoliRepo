using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ESAP.Sirecec.Data.Migrations
{
    /// <inheritdoc />
    public partial class CursoParticipanteOtros : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CapacitacionId",
                table: "Nucleo",
                type: "NUMBER(10)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ConsultaDocId",
                table: "Modulo",
                type: "NUMBER(10)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Capacitacion",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    NucleoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    FechaInicio = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Capacitacion", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ConsultaDoc",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Evento = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    FechaInicio = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    Docente = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConsultaDoc", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CursoDocente",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    NombreCurso = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CursoDocente", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CursoEstudiante",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    CodigoCurso = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    NombreCurso = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Tipo = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Identificacion = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    NombreParticipante = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    ApellidosParticipante = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CursoEstudiante", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Dependencia",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dependencia", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Indicador",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    ObjetivoId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Descripcion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Indicador", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Participante",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    TipoDocumento = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    NumeroDocumento = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Nombres = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Apellidos = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    FechaNacimiento = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    NivelEscolar = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    EstadoCivil = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Profesion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Contacto = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Correo = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Direccion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Departamento = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Municipio = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Entidad = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Cargo = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    ParticipanteOtro = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    ServidorPublico = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Vulnerabilidad = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Discapacidad = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    GrupoEtnico = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    RolESAP = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participante", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tema",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    ConsultaDocId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tema", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tema_ConsultaDoc_ConsultaD~",
                        column: x => x.ConsultaDocId,
                        principalTable: "ConsultaDoc",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Producto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Descripcion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    DependenciaId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Producto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Producto_Dependencia_Depen~",
                        column: x => x.DependenciaId,
                        principalTable: "Dependencia",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Nucleo_CapacitacionId",
                table: "Nucleo",
                column: "CapacitacionId");

            migrationBuilder.CreateIndex(
                name: "IX_Modulo_ConsultaDocId",
                table: "Modulo",
                column: "ConsultaDocId");

            migrationBuilder.CreateIndex(
                name: "IX_Producto_DependenciaId",
                table: "Producto",
                column: "DependenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_Tema_ConsultaDocId",
                table: "Tema",
                column: "ConsultaDocId");

            migrationBuilder.AddForeignKey(
                name: "FK_Modulo_ConsultaDoc_Consult~",
                table: "Modulo",
                column: "ConsultaDocId",
                principalTable: "ConsultaDoc",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Nucleo_Capacitacion_Capaci~",
                table: "Nucleo",
                column: "CapacitacionId",
                principalTable: "Capacitacion",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Modulo_ConsultaDoc_Consult~",
                table: "Modulo");

            migrationBuilder.DropForeignKey(
                name: "FK_Nucleo_Capacitacion_Capaci~",
                table: "Nucleo");

            migrationBuilder.DropTable(
                name: "Capacitacion");

            migrationBuilder.DropTable(
                name: "CursoDocente");

            migrationBuilder.DropTable(
                name: "CursoEstudiante");

            migrationBuilder.DropTable(
                name: "Indicador");

            migrationBuilder.DropTable(
                name: "Participante");

            migrationBuilder.DropTable(
                name: "Producto");

            migrationBuilder.DropTable(
                name: "Tema");

            migrationBuilder.DropTable(
                name: "Dependencia");

            migrationBuilder.DropTable(
                name: "ConsultaDoc");

            migrationBuilder.DropIndex(
                name: "IX_Nucleo_CapacitacionId",
                table: "Nucleo");

            migrationBuilder.DropIndex(
                name: "IX_Modulo_ConsultaDocId",
                table: "Modulo");

            migrationBuilder.DropColumn(
                name: "CapacitacionId",
                table: "Nucleo");

            migrationBuilder.DropColumn(
                name: "ConsultaDocId",
                table: "Modulo");
        }
    }
}
