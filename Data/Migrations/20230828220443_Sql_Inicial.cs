using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ESAP.Sirecec.Data.Migrations
{
    /// <inheritdoc />
    public partial class Sql_Inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(File.ReadAllText("Migrations/sql/20230615-01-vwClasificadores.sql"));
            migrationBuilder.Sql(File.ReadAllText("Migrations/sql/20230615-02-vwUsuarios.sql"));
            // migrationBuilder.Sql(File.ReadAllText("Migrations/sql/20230615-03-Datos.sql"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP VIEW ""Clasificadores"";");
            migrationBuilder.Sql(@"DROP VIEW ""Usuarios"";");
            // migrationBuilder.Sql(@"DELETE FROM ""Clasificador"";");
            // migrationBuilder.Sql(@"ALTER TABLE ""Clasificador"" MODIFY ""Id"" GENERATED AS IDENTITY(INCREMENT BY 1);");
            // migrationBuilder.Sql(@"DELETE FROM ""ClasificadorTipo"";");
            // migrationBuilder.Sql(@"ALTER TABLE ""ClasificadorTipo"" MODIFY ""Id"" GENERATED AS IDENTITY(INCREMENT BY 1);");
            // migrationBuilder.Sql(@"DELETE FROM ""Modulo"";");
            // migrationBuilder.Sql(@"ALTER TABLE ""Modulo"" MODIFY ""Id"" GENERATED AS IDENTITY(INCREMENT BY 1);");
            // migrationBuilder.Sql(@"DELETE FROM ""Producto"";");
            // migrationBuilder.Sql(@"ALTER TABLE ""Producto"" MODIFY ""Id"" GENERATED AS IDENTITY(INCREMENT BY 1);");
            // migrationBuilder.Sql(@"DELETE FROM ""Programa"";");
            // migrationBuilder.Sql(@"ALTER TABLE ""Programa"" MODIFY ""Id"" GENERATED AS IDENTITY(INCREMENT BY 1);");
            // migrationBuilder.Sql(@"DELETE FROM ""Tema"";");
            // migrationBuilder.Sql(@"ALTER TABLE ""Tema"" MODIFY ""Id"" GENERATED AS IDENTITY(INCREMENT BY 1);");
            // migrationBuilder.Sql(@"DELETE FROM ""Nucleo"";");
            // migrationBuilder.Sql(@"ALTER TABLE ""Nucleo"" MODIFY ""Id"" GENERATED AS IDENTITY(INCREMENT BY 1);");
            // migrationBuilder.Sql(@"DELETE FROM ""BancoPrograma"";");
            // migrationBuilder.Sql(@"ALTER TABLE ""BancoPrograma"" MODIFY ""Id"" GENERATED AS IDENTITY(INCREMENT BY 1);");
            // migrationBuilder.Sql(@"DELETE FROM ""AuthUserRoles"";");
            // migrationBuilder.Sql(@"DELETE FROM ""AuthUsers"";");
            // migrationBuilder.Sql(@"ALTER TABLE ""AuthUsers"" MODIFY ""Id"" GENERATED AS IDENTITY(INCREMENT BY 1);");
            // migrationBuilder.Sql(@"DELETE FROM ""AuthRoles"";");
            // migrationBuilder.Sql(@"ALTER TABLE ""AuthRoles"" MODIFY ""Id"" GENERATED AS IDENTITY(INCREMENT BY 1);");
        }
    }
}