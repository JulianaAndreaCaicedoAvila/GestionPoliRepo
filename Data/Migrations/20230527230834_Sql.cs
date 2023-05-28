using System.Globalization;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ESAP.Sirecec.Data.Migrations
{
	/// <inheritdoc />
	public partial class Sql : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql(File.ReadAllText("Migrations/sql/Clasificadores.sql"));
			migrationBuilder.Sql(File.ReadAllText("Migrations/sql/Usuarios.sql"));
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql(@"DROP VIEW ""Clasificadores"";");
			migrationBuilder.Sql(@"DROP VIEW ""Usuarios"";");
		}
	}
}
