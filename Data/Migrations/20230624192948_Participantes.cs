using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ESAP.Sirecec.Data.Migrations
{
    /// <inheritdoc />
    public partial class Participantes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CursosDocentes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    NombreCursos = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CursosDocentes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CursosEstudiantes",
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
                    table.PrimaryKey("PK_CursosEstudiantes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Participantes",
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
                    Participante = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
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
                    table.PrimaryKey("PK_Participantes", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CursosDocentes");

            migrationBuilder.DropTable(
                name: "CursosEstudiantes");

            migrationBuilder.DropTable(
                name: "Participantes");
        }
    }
}
