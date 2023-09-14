using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ESAP.Sirecec.Data.Migrations
{
    /// <inheritdoc />
    public partial class EscuelaNivel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NivelId",
                table: "Curso",
                type: "NUMBER(10)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Escuela",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Descripcion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Escuela", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Nivel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    EscuelaId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Descripcion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nivel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Nivel_Escuela_EscuelaId",
                        column: x => x.EscuelaId,
                        principalTable: "Escuela",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Curso_NivelId",
                table: "Curso",
                column: "NivelId");

            migrationBuilder.CreateIndex(
                name: "IX_Nivel_EscuelaId",
                table: "Nivel",
                column: "EscuelaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Curso_Nivel_NivelId",
                table: "Curso",
                column: "NivelId",
                principalTable: "Nivel",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Curso_Nivel_NivelId",
                table: "Curso");

            migrationBuilder.DropTable(
                name: "Nivel");

            migrationBuilder.DropTable(
                name: "Escuela");

            migrationBuilder.DropIndex(
                name: "IX_Curso_NivelId",
                table: "Curso");

            migrationBuilder.DropColumn(
                name: "NivelId",
                table: "Curso");
        }
    }
}
