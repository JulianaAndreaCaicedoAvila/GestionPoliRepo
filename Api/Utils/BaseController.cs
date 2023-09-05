using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using DevExtreme.AspNet.Data;
using ESAP.Sirecec.Data;
using ESAP.Sirecec.Data.Api.Authorization;
using ESAP.Sirecec.Data.Api.Utils;
using ESAP.Sirecec.Data.Core;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace ESAP.Sirecec.Data.Api.Controllers
{

	public class BaseController : ControllerBase
	{
		public readonly DataContext? _db;
		public readonly IConfiguration? _conf;
		public readonly IHttpContextAccessor? _context;

		public BaseController() { }

		public BaseController(DataContext dbContext)
		{
			_db = dbContext;
		}

		public BaseController(DataContext dbContext, IConfiguration iConfiguration)
		{
			_db = dbContext;
			_conf = iConfiguration;
		}

		public BaseController(DataContext context, IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
		{
			_db = context;
			_conf = configuration;
			_context = httpContextAccessor;
		}

		internal static int GetUserId()
		{
			var userId = 0;
			var identity = (ClaimsIdentity)Thread.CurrentPrincipal.Identity;
			var uId = identity.FindFirst(ClaimTypes.Sid);
			if (uId != null) userId = int.Parse(uId.Value);
			return userId;
		}

		// internal static Task<int> GetUserIdAsync()
		// {
		// var ValidIssuer = _conf["Jwt:Issuer"];
		// var ValidAudience = _conf["Jwt:Audience"];
		// var IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_conf["Jwt:Key"]));
		// var header = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
		// var claim = Thread.CurrentPrincipal.Identity.Claims.First(x => x.Type == ClaimTypes.Sid);
		// var claimsIdentity = identity.cla;
		// var token = header.Parameter;
		// var scheme = header.Scheme;
		// if (User.Identity is ClaimsIdentity claimsIdentity)
		// {
		// 	var uId = claimsIdentity.FindFirst(ClaimTypes.Sid);
		// 	userId = uId != null ? int.Parse(uId.Value) : 8;
		// }
		// var userId = 1;
		// var header = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
		// var token = header.Parameter;
		// var scheme = header.Scheme;
		// var accessToken = await HttpContext.GetTokenAsync("Bearer", "access_token");
		// var claims = User.Claims;
		// if (User.Identity is ClaimsIdentity claimsIdentity)
		// {
		// 	var uId = claimsIdentity.FindFirst(ClaimTypes.Sid);
		// 	userId = uId != null ? int.Parse(uId.Value) : 1;
		// }
		// return userId;
		// }
	}
}
