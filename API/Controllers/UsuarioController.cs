using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DevExtreme.AspNet.Data;
using ESAP.Sirecec.Data.API.Services;
using ESAP.Sirecec.Data.API.Utils;
using ESAP.Sirecec.Data.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace ESAP.Sirecec.Data.API.Controllers
{

	// public record AuthenticateRequest(string? Email, string? Password);
	// public record UserRequest(int Id, int RoleId, int CompanyId, string? FirstName, string? LastName, string? Email, string? Password);


	public class AuthenticateRequest
	{
		public string? Email { get; set; }
		public string? Password { get; set; }
	}

	public class UserRequest
	{
		public int Id { get; set; }
		public int RoleId { get; set; }
		public int CompanyId { get; set; }
		public int? DependenceId { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? Email { get; set; }
		public string? Password { get; set; }
	}

	[Authorize]
	[ApiController]
	[Route("usuario")]
	public class UsuarioController : ControllerBase
	{
		private readonly IConfiguration _configuration;
		private readonly IAzureAdService _ad;
		private readonly Data.DataContext _context;
		private readonly UserManager<Data.Identity.AuthUser> _userManager;
		private readonly RoleManager<AuthRole> _roleManager;
		public UsuarioController(IConfiguration configuration, IAzureAdService ad, UserManager<Data.Identity.AuthUser> userManager, RoleManager<AuthRole> roleManager, Data.DataContext context)
		{
			_ad = ad;
			_configuration = configuration;
			_context = context;
			_userManager = userManager;
			_roleManager = roleManager;
		}

		private async Task<ActionResult> GetUserResult(Data.Identity.AuthUser user)
		{
			var roleName = (await _userManager.GetRolesAsync(user)).First();
			// var role = await _roleManager.FindByNameAsync(roleName);
			var usuario = _context.Users.First(o => o.Email.Trim().ToLower() == user.Email.Trim().ToLower());
			var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
			var claims = new List<Claim> {
				new Claim(ClaimTypes.Sid, user.Id.ToString()),
				new Claim(ClaimTypes.Name, user.UserName),
				new Claim(ClaimTypes.GivenName, $"{user.FirstName} {user.LastName}"),
				new Claim(ClaimTypes.Role, roleName)
			};
			var tokenDescriptor = new JwtSecurityToken(
					issuer: _configuration["Jwt:Issuer"],
					audience: _configuration["Jwt:Audience"],
					claims: claims,
					expires: DateTime.Now.AddMinutes(int.Parse(_configuration["Jwt:Expires"])),
					signingCredentials: credentials);
			var jwt = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
			return Ok(new
			{
				user,
				usuario,
				// role,
				token = jwt
			});
		}

		[AllowAnonymous]
		[HttpPost("autenticar")]
		public async Task<ActionResult> Auth(AuthenticateRequest request)
		{
			var user = await _userManager.FindByEmailAsync(request.Email);
			if (user is null || !await _userManager.CheckPasswordAsync(user, request.Password)) return Forbid();
			return await GetUserResult(user);
		}

		[AllowAnonymous]
		[HttpPost("email")]
		public async Task<ActionResult> ByEmail()
		{
			StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
			var email = reader.ReadToEndAsync().Result;
			var user = await _userManager.FindByEmailAsync(email);
			if (user == null) return BadRequest($"El usuario con el correo {user.Email} no existe");
			return await GetUserResult(user);
		}

		[HttpPost("ed")]
		public async Task<ActionResult?> Procesar()
		{
			StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
			var str = reader.ReadToEndAsync().Result;
			var uReq = JsonConvert.DeserializeObject<UserRequest>(str);
			if (uReq.Id != 0)
			{
				// 202208170339: Actualizando usuario
				var user = await _userManager.FindByEmailAsync(uReq.Email);
				if (user != null)
				{
					user.CompanyId = uReq.CompanyId;
					user.DependenceId = uReq.DependenceId;
					user.FirstName = uReq.FirstName;
					user.LastName = uReq.LastName;
					await _userManager.UpdateAsync(user);
					var role = await _roleManager.FindByIdAsync(uReq.RoleId.ToString());
					if (role != null)
					{
						var roles = await _userManager.GetRolesAsync(user);
						await _userManager.RemoveFromRolesAsync(user, roles.ToArray());
						await _userManager.AddToRoleAsync(user, role.Name);
					}
					if (uReq.Password != null)
					{
						await _userManager.RemovePasswordAsync(user);
						await _userManager.AddPasswordAsync(user, uReq.Password);
					}
					return Ok(user);
				}
				return null;
			}
			else
			{
				var user = await _userManager.FindByEmailAsync(uReq.Email);
				if (user != null) return BadRequest($"El usuario con el correo {user.Email} ya existe");
				if (uReq.Email.ToLower().Contains("@esap.edu.co"))
				{
					uReq.Password = "Acceso*" + DateTime.Now.Year;
					var parts = uReq.Email.ToLower().Replace("@esap.edu.co", "").Split(".");
					// var adUser = await _ad.GetByEmailAsync(uReq.Email.ToLower());
					if (parts.Length > 1)
					{
						uReq.FirstName = parts[0].FirstLetterToUpper();
						uReq.LastName = parts[1].FirstLetterToUpper();
					}
					else
					{
						uReq.FirstName = "Usuario";
						uReq.LastName = "ANSV";
					}
				}
				var newUser = new Data.Identity.AuthUser
				{
					CompanyId = uReq.CompanyId,
					DependenceId = uReq.DependenceId,
					Email = uReq.Email,
					UserName = uReq.Email,
					FirstName = uReq.FirstName,
					LastName = uReq.LastName
				};
				var identityResult = await _userManager.CreateAsync(newUser, uReq.Password);
				var role = await _roleManager.FindByIdAsync(uReq.RoleId.ToString());
				if (role != null) await _userManager.AddToRoleAsync(newUser, role.Name);
				return Ok(newUser);
			}
		}

		// [HttpGet("todos")]
		// public List<Users> Todos()
		// {
		// 	return _context.Users.ToList();
		// }

		[HttpPost("todos/dx")]
		public ActionResult Users()
		{
			var opts = Data.Utils.GetFromRequest(Request);
			opts.PrimaryKey = new[] { "Id" };
			var items = _context.Users.ToList();
			var loadResult = DataSourceLoader.Load(items, opts);
			return Ok(loadResult);
		}

		[AllowAnonymous]
		[HttpGet("ping")]
		public ActionResult Ping()
		{
			return Content("OK!", "text/plain;charset=utf-8");
		}
	}
}
