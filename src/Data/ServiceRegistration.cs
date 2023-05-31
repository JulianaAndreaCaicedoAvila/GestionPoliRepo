using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ESAP.Sirecec.Data
{
	public static class ServiceRegistration
	{
		public static IServiceCollection ConfigureDataServices(this IServiceCollection services, IConfiguration configuration)
		{
			// 202202071041: Using a Separate Migrations Project http://t.ly/m3af
			// services.AddDbContext<DataContext>(o => o.UseSqlServer(configuration.GetConnectionString("ConnStr"), o => o.MigrationsAssembly("WebApplication1.Migrations")));
			// services.AddDbContext<DataContext>(o => o.UseSqlServer(configuration.GetConnectionString("ConnStr"), o => o.MigrationsAssembly("ESAP.Sirecec.API")));
			// services.AddDbContext<DataContext>(o => o.UseOracle(configuration.GetConnectionString("ConnStr")));
			services.AddDbContext<DataContext>(o =>
				{
					var conn = configuration.GetConnectionString("ConnStr");
					// var conn = configuration["ConnectionStrings:ConnStr"];
					// var conn = "User Id=sirecec_v4;Password=sirecec_v4;Data Source=localhost:1521/ORCLPDB;";
					var cmdTo = configuration.GetValue<int>("Oracle:CommandTimeout");
					var sqlComp = configuration.GetValue<string>("Oracle:SQLCompatibility");
					o.ConfigureWarnings(w => w.Throw(RelationalEventId.MultipleCollectionIncludeWarning));
					o.UseOracle(conn, o =>
					{
						o.CommandTimeout(cmdTo);
						o.UseOracleSQLCompatibility(sqlComp ?? "12");
						o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
					});
					// var conn = "User Id=sirecec;Password=sirecec;Data Source=localhost:1521/ORCLPDB1;";
					// var conn = "SERVER=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=127.0.0.1)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=ORCLPDB1)));uid=sirecec;pwd=sirecec;";
					// var conn = Configuration["ConnectionStrings:ConnStrOrc"];
					// options.UseOracle(conn, b => b.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
					// options.UseOracleSQLCompatibility(orcSqlComp)
				});
			// services.AddDbContext<DataContext>(o => o.UseOracle());
			// services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
			return services;
		}
	}
}
