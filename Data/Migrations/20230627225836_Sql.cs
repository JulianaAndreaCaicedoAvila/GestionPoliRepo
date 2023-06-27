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
			migrationBuilder.Sql(File.ReadAllText("Migrations/sql/20230615-01-Clasificadores.sql"));
			migrationBuilder.Sql(File.ReadAllText("Migrations/sql/20230615-02-Usuarios.sql"));
			migrationBuilder.Sql(File.ReadAllText("Migrations/sql/20230615-03-Datos.sql"));
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql(@"DROP VIEW ""Clasificadores"";");
			migrationBuilder.Sql(@"DROP VIEW ""Usuarios"";");
		}
	}
}
