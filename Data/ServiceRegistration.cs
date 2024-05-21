using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Poli.Repositorio.Data {
	public static class ServiceRegistration {
		public static IServiceCollection ConfigureDataServices(this IServiceCollection services, IConfiguration configuration) {
			// 202202071041: Using a Separate Migrations Project http://t.ly/m3af
			var connStr = configuration.GetConnectionString("ConnStr");
			services.AddDbContext<DataContext>(o => {
				// var conn = configuration.GetConnectionString("ConnStr");
				// var cmdTo = configuration.GetValue<int>("Oracle:CommandTimeout");
				// var sqlComp = configuration.GetValue<string>("Oracle:SQLCompatibility");
				// o.ConfigureWarnings(w => w.Throw(RelationalEventId.MultipleCollectionIncludeWarning));
				// o.UseMySql(connStr, ServerVersion.AutoDetect(connStr));
				o.UseMySQL(connStr);
				// o.UseOracle(conn, o => {
				// 	o.CommandTimeout(cmdTo);
				// 	o.UseOracleSQLCompatibility(sqlComp ?? "11");
				// 	o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
				// });
			});
			return services;
		}
	}
}
