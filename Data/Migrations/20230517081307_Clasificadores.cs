using System.Globalization;
using ESAP.Sirecec.Data;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ESAP.Sirecec.Data.Migrations
{
	/// <inheritdoc />
	public partial class Clasificadores : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			// migrationBuilder.RunSql(typeof(Clasificadores));
			migrationBuilder.RunFile("20230517081307_Clasificadores");
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql("DROP VIEW SIRECEC_V4.\"Clasificadores\";");
		}
	}
}
