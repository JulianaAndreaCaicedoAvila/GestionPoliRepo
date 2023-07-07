using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ESAP.Sirecec.Data.Migrations
{
    /// <inheritdoc />
    public partial class _20230707ActualizacionGraficas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GraficaEncuesta",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    BancoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    FechaInicio = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    FechaFinal = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    ClasificadorTipoId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    Docentes = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GraficaEncuesta", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GraficaEncuesta_Clasificad~",
                        column: x => x.ClasificadorTipoId,
                        principalTable: "ClasificadorTipo",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "GraficaEncuestaGeneral",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    BancoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    FechaInicio = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    FechaFinal = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    ClasificadorTipoId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    Docentes = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GraficaEncuestaGeneral", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GraficaEncuestaGeneral_Cla~",
                        column: x => x.ClasificadorTipoId,
                        principalTable: "ClasificadorTipo",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Curso",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    NucleoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    FechaInicio = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    GraficaEncuestaGeneralId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    GraficaEncuestaId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Curso", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Curso_GraficaEncuestaGener~",
                        column: x => x.GraficaEncuestaGeneralId,
                        principalTable: "GraficaEncuestaGeneral",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Curso_GraficaEncuesta_Graf~",
                        column: x => x.GraficaEncuestaId,
                        principalTable: "GraficaEncuesta",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Curso_GraficaEncuestaGener~",
                table: "Curso",
                column: "GraficaEncuestaGeneralId");

            migrationBuilder.CreateIndex(
                name: "IX_Curso_GraficaEncuestaId",
                table: "Curso",
                column: "GraficaEncuestaId");

            migrationBuilder.CreateIndex(
                name: "IX_GraficaEncuesta_Clasificad~",
                table: "GraficaEncuesta",
                column: "ClasificadorTipoId");

            migrationBuilder.CreateIndex(
                name: "IX_GraficaEncuestaGeneral_Cla~",
                table: "GraficaEncuestaGeneral",
                column: "ClasificadorTipoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Curso");

            migrationBuilder.DropTable(
                name: "GraficaEncuestaGeneral");

            migrationBuilder.DropTable(
                name: "GraficaEncuesta");
        }
    }
}
