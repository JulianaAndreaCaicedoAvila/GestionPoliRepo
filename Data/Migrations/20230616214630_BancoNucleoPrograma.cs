using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ESAP.Sirecec.Data.Migrations
{
    /// <inheritdoc />
    public partial class BancoNucleoPrograma : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "EditadoEl",
                table: "ClasificadorTipo",
                type: "TIMESTAMP(7)",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP",
                oldClrType: typeof(DateTime),
                oldType: "TIMESTAMP(7)",
                oldNullable: true,
                oldDefaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreadoEl",
                table: "ClasificadorTipo",
                type: "TIMESTAMP(7)",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP",
                oldClrType: typeof(DateTime),
                oldType: "TIMESTAMP(7)",
                oldNullable: true,
                oldDefaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.AddColumn<bool>(
                name: "Activo",
                table: "ClasificadorTipo",
                type: "NUMBER(1)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Orden",
                table: "ClasificadorTipo",
                type: "NUMBER(10)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Banco",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    FechaInicio = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Banco", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Nucleo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    BancoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
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
                    table.PrimaryKey("PK_Nucleo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Nucleo_Banco_BancoId",
                        column: x => x.BancoId,
                        principalTable: "Banco",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Programa",
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
                    table.PrimaryKey("PK_Programa", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Programa_Nucleo_NucleoId",
                        column: x => x.NucleoId,
                        principalTable: "Nucleo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Nucleo_BancoId",
                table: "Nucleo",
                column: "BancoId");

            migrationBuilder.CreateIndex(
                name: "IX_Programa_NucleoId",
                table: "Programa",
                column: "NucleoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Programa");

            migrationBuilder.DropTable(
                name: "Nucleo");

            migrationBuilder.DropTable(
                name: "Banco");

            migrationBuilder.DropColumn(
                name: "Activo",
                table: "ClasificadorTipo");

            migrationBuilder.DropColumn(
                name: "Orden",
                table: "ClasificadorTipo");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EditadoEl",
                table: "ClasificadorTipo",
                type: "TIMESTAMP(7)",
                nullable: true,
                defaultValueSql: "CURRENT_TIMESTAMP",
                oldClrType: typeof(DateTime),
                oldType: "TIMESTAMP(7)",
                oldDefaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreadoEl",
                table: "ClasificadorTipo",
                type: "TIMESTAMP(7)",
                nullable: true,
                defaultValueSql: "CURRENT_TIMESTAMP",
                oldClrType: typeof(DateTime),
                oldType: "TIMESTAMP(7)",
                oldDefaultValueSql: "CURRENT_TIMESTAMP");
        }
    }
}
