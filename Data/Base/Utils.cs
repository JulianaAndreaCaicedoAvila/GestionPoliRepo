using System.Globalization;
using System.Linq.Expressions;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Migrations;
using Newtonsoft.Json;

namespace SongStock.Data
{
	public static class Utils
	{

		public static LoadOptions? GetFromRequest(HttpRequest request)
		{
			StreamReader reader = new(request.Body, Encoding.UTF8);
			var str = reader.ReadToEndAsync().Result;
			var opts = string.IsNullOrEmpty(str) ? new LoadOptions() : JsonConvert.DeserializeObject<LoadOptions>(str);
			return opts;
		}
		/*
		
				public static void RunSql(this MigrationBuilder builder, Type type)
				{
					var migrationAttribute = (MigrationAttribute)type
						.GetCustomAttributes(typeof(MigrationAttribute), false)
						.Single();
					var sql = File.ReadAllText(string.Format(
						 CultureInfo.InvariantCulture,
						 "{1}{0}Migrations{0}{2}",
						 Path.DirectorySeparatorChar,
						 AppContext.BaseDirectory,
						 $"{migrationAttribute.Id}.sql"));
					builder.Sql(sql);
				}

				public static MigrationBuilder DropStoredProcedureIfExists(this MigrationBuilder builder, string storedProcedureName)
				{
					builder.Sql(
		$@"IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.{storedProcedureName}'))
			 DROP PROCEDURE [dbo].[{storedProcedureName}]
		GO");
					return builder;
				}

				public static MigrationBuilder RunFile(this MigrationBuilder builder, string filename)
				{
					if (builder == null) throw new ArgumentNullException(nameof(builder));
					string data = AppDomain.CurrentDomain.GetData("DataDirectory") as string ?? AppContext.BaseDirectory;
					string sqlPath = null;

					sqlPath = Path.Combine(data, "sql", filename);
					if (File.Exists(sqlPath))
					{
						builder.Sql(File.ReadAllText(sqlPath));
					}
					else
					{
						// TO DO: I usually replace this generic exception with `AppMigrationException`.
						throw new Exception($"Migration .sql file not found: ${filename}");
					}
					return builder;
				}
				*/
	}
}