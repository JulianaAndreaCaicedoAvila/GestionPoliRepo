using System.IdentityModel.Tokens.Jwt;
using System.Text;
using ESAP.Sirecec.Api.Authorization;
using ESAP.Sirecec.Data;
using ESAP.Sirecec.Data.Api.Authorization;
using ESAP.Sirecec.Data.Api.Middleware;
using ESAP.Sirecec.Data.Api.Services;
using ESAP.Sirecec.Data.Identity;
using Hellang.Middleware.ProblemDetails;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

// 202206080343: Authenticating tokens from multiple sources (e.g Cognito and Azure) 
// https://stackoverflow.com/a/66115586
var appName = "PnsvApp";

// 202206030105: Authentication and authorization in Ocelot API Gateways -> https://t.ly/r12-
// 202206030117: Web app that signs in users => https://t.ly/JUe4
// 202206030151: Create a web API with ASP.NET Core https://t.ly/kMJm
var builder = WebApplication.CreateBuilder(args);

// 202307131141: Logs
builder.Logging.ClearProviders();

// 202202071938: Migration to ASP.NET Core in .NET 6 -> https://gist.github.com/davidfowl/0e0372c3c1d895c3ce195ba983b1e03d
// 202201282046: Add services to the container -> https://stackoverflow.com/a/69722959
// Migrate from ASP.NET Core 5.0 to 6.0 -> https://t.ly/oQGmj
ConfigurationManager configuration = builder.Configuration;
IWebHostEnvironment env = builder.Environment;
configuration.SetBasePath(env.ContentRootPath)
	.AddJsonFile($"appsettings.json", optional: false, reloadOnChange: true)
	.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
	.AddEnvironmentVariables().Build();
var services = builder.Services;

// 202206030515: Access appsettings.json values in controller classes https://stackoverflow.com/a/38359523
services.AddSingleton<IConfiguration>(configuration);

// 202201282058: CORS
services.AddCors(o => o.AddPolicy(appName, builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));

// Add services to the container.
// 202307131122: Response caching in ASP.NET Core
// https://learn.microsoft.com/en-us/aspnet/core/performance/caching/overview?view=aspnetcore-6.0
// https://learn.microsoft.com/en-us/aspnet/core/performance/caching/response?view=aspnetcore-6.0#cache-profiles
services.AddResponseCaching();
services.AddControllers(options =>
{
	options.CacheProfiles.Add("3m",
		 new CacheProfile()
		 {
			 Duration = 180,
			 Location = ResponseCacheLocation.Any,
		 });
});

// 202308221833: Error handling
// https://www.infoworld.com/article/3584786/how-to-use-the-problemdetails-middleware-in-aspnet-core.html
// https://code-maze.com/using-the-problemdetails-class-in-asp-net-core-web-api
services.AddProblemDetails();


// configure DI for application services
services.AddScoped<IJwtUtils, JwtUtils>();
// services.AddScoped<IUserService, UserService>();
services.AddScoped<IEmailService, EmailService>();

// 202208170543: Azure
services.AddScoped<IAzureAdService, AzureAdService>();



// 202202071919: Identity
// 202208170634: https://stackoverflow.com/a/39826998
services.AddIdentityCore<AuthUser>(options =>
{
	options.Password.RequireDigit = false;
	options.Password.RequiredLength = 5;
	options.Password.RequireNonAlphanumeric = false;
	options.Password.RequireUppercase = false;
	options.Password.RequireLowercase = false;
}).AddRoles<AuthRole>().AddEntityFrameworkStores<DataContext>()
.AddTokenProvider<DataProtectorTokenProvider<AuthUser>>(TokenOptions.DefaultProvider);
// Default Token Lifespan is 24 hours (1 day)
services.Configure<DataProtectionTokenProviderOptions>(o => o.TokenLifespan = TimeSpan.FromHours(1));

// 202206030752: Security -> https://stackoverflow.com/a/66115586
// 202301181918: https://stackoverflow.com/a/52135130
services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
services.AddTransient(provider => provider.GetService<IHttpContextAccessor>().HttpContext.User);
services.AddHttpContextAccessor()
	.AddAuthorization(options =>
	{
		options.DefaultPolicy = new AuthorizationPolicyBuilder(appName).AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme).RequireAuthenticatedUser().Build();
	})
	.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(appName, options =>
	{
		options.TokenValidationParameters = new TokenValidationParameters
		{
			ClockSkew = TimeSpan.Zero,
			ValidateIssuer = true,
			ValidateAudience = true,
			ValidateLifetime = true,
			ValidateIssuerSigningKey = true,
			ValidIssuer = configuration["Jwt:Issuer"],
			ValidAudience = configuration["Jwt:Audience"],
			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))
		};
	})
.AddMicrosoftIdentityWebApi(configuration, "AzureAd")
//  .AddMicrosoftIdentityWebApi(configuration, configuration.GetSection("AzureAd"))
// .EnableTokenAcquisitionToCallDownstreamApi()
// .AddInMemoryTokenCaches()
// .AddOpenIdConnect("aad", o => {
// 	// if (app.Environment.IsDevelopment()) {
// 	o.RequireHttpsMetadata = false;
// 	// }
// 	// 202206080202: Validate the ID token https://t.ly/9JIX
// 	o.Authority = "https://login.microsoftonline.com/{tenantID}/v2.0";
// 	o.AuthenticationMethod = OpenIdConnectRedirectBehavior.RedirectGet;
// 	o.ClientId = "[clientid]";
// 	o.ClientSecret = "[clientsecret]";
// 	o.ResponseMode = "form_post";
// 	o.ResponseType = "id_token";
// 	o.CallbackPath = new PathString("/api/connect/microsoftcallback2");
// 	o.TokenValidationParameters = new TokenValidationParameters {
// 		ValidIssuer = "https://login.microsoftonline.com/{tenantID}/v2.0"
// 	};
// });
;

// 202202071917: Traído de Data
services.ConfigureDataServices(configuration);
// services.AddDbContext<DataContext>(o =>
// 	{
// 		var conn = configuration.GetConnectionString("ConnStr");
// 		// var conn = configuration["ConnectionStrings:ConnStr"];
// 		// var conn = "User Id=sirecec_v4;Password=sirecec_v4;Data Source=localhost:1521/ORCLPDB;";
// 		var cmdTo = configuration.GetValue<int>("Oracle:CommandTimeout");
// 		var sqlComp = configuration.GetValue<string>("Oracle:SQLCompatibility");
// 		o.ConfigureWarnings(w => w.Throw(RelationalEventId.MultipleCollectionIncludeWarning));
// 		o.UseOracle(conn, o =>
// 		{
// 			o.CommandTimeout(cmdTo);
// 			o.UseOracleSQLCompatibility(sqlComp ?? "12");
// 			o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
// 		});
// 		// var conn = "User Id=sirecec;Password=sirecec;Data Source=localhost:1521/ORCLPDB1;";
// 		// var conn = "SERVER=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=127.0.0.1)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=ORCLPDB1)));uid=sirecec;pwd=sirecec;";
// 		// var conn = Configuration["ConnectionStrings:ConnStrOrc"];
// 		// options.UseOracle(conn, b => b.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
// 		// options.UseOracleSQLCompatibility(orcSqlComp)
// 	});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
// services.AddSwaggerGen();


// 202202072217: Config
services.AddSwaggerGen(c =>
{
	c.SwaggerDoc("v1", new OpenApiInfo { Title = "ESAP SIRECEC API v1.0", Version = "v1" });
	c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
	{
		Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
		Name = "Authorization",
		In = ParameterLocation.Header,
		Type = SecuritySchemeType.ApiKey,
		Scheme = "Bearer"
	});
	c.AddSecurityRequirement(new OpenApiSecurityRequirement(){{
		new OpenApiSecurityScheme{
			Reference = new OpenApiReference{
					Type = ReferenceType.SecurityScheme,
					Id = "Bearer"
				},
				Scheme = "oauth2",
				Name = "Bearer",
				In = ParameterLocation.Header,
			},
			new List<string>()
		}
	});
	// var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
	// var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
	// c.IncludeXmlComments(xmlPath);
});

var app = builder.Build();

// 202202072023: Seed
// await app.SeedData(configuration, environment);

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment()) {
app.UseSwagger();
app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();
// 202202071932: Identity
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(appName);

// 202306031506: Global error handler
app.UseMiddleware<ErrorHandler>();
// app.UseMiddleware<JwtMiddleware>();
app.MapControllers();
app.UseResponseCaching();
app.UseProblemDetails();
app.Run();
