using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using DevExtreme.AspNet.Data;
using ESAP.Sirecec.Data.Api.Authorization;
using ESAP.Sirecec.Data.Api.Services;
using ESAP.Sirecec.Data.Api.Utils;
using ESAP.Sirecec.Data.Identity;
using ESAP.Sirecec.Data.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace ESAP.Sirecec.Data.Api.Controllers
{
    [@Authorize]
    [ApiController]
    [Route("usuario")]
    public class UsuarioController : BaseController
    {
        private readonly IConfiguration _configuration;
        private readonly IEmailService _email;
        private readonly IAzureAdService _ad;
        private readonly Data.DataContext _context;
        private readonly UserManager<Data.Identity.AuthUser> _userManager;
        private readonly RoleManager<AuthRole> _roleManager;
        public UsuarioController(IConfiguration configuration, IAzureAdService ad, UserManager<AuthUser> userManager,
            RoleManager<AuthRole> roleManager, IEmailService email, Data.DataContext context)
        {
            _ad = ad;
            _configuration = configuration;
            _context = context;
            _email = email;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [AllowAnonymous]
        [HttpGet("roles")]
        public ActionResult GetRoles()
        {
            var roles = _roleManager.Roles.ToList();
            return Ok(roles);
        }

        [AllowAnonymous]
        [HttpPost("autenticar")]
        public async Task<ActionResult> Authenticate(AuthenticateRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user is null || !user.EmailConfirmed || !user.IsActive || !await _userManager.CheckPasswordAsync(user, request.Password))
                return Forbid();
            return await GetUserResult(user);
        }

        [AllowAnonymous]
        [HttpPost("email")]
        public async Task<ActionResult> ByEmail(AuthenticateRequest request)
        {
            // StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
            // var email = reader.ReadToEndAsync().Result;
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null) return BadRequest($"El usuario con el correo {user.Email} no existe");
            if (request.Email.Trim().ToLower().Contains("esap.edu.co") && user.FirstName + " " + user.LastName != request.Name)
            {
                var ns = request.Name.Trim().Split(" "); // Divide el nombre 'Sandra Reyes García'
                var l = ns.Length;
                user.FirstName = ns[0] + (l <= 3 ? "" : " " + ns[1]); // Nombres 'Sandra'
                user.LastName = ns[l - 2] + " " + ns[l - 1]; // Apellidos 'Reyes García'
                var identityResult = await _userManager.UpdateAsync(user);
            }
            return await GetUserResult(user);
        }

        [AllowAnonymous]
        [HttpPost("recuperar")]
        public async Task<ActionResult> Recover(AuthenticateRequest request)
        {
            var email = request.Email.Trim().ToUpper();
            var user = await _userManager.FindByEmailAsync(email);
            // https://github.com/dotnet/aspnetcore/blob/1dcf7acfacf0fe154adcc23270cb0da11ff44ace/src/Identity/UI/src/Areas/Identity/Pages/V5/Account/ForgotPassword.cshtml.cs
            if (user != null)
            {
                // For more information on how to enable account confirmation and password reset please
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                var callbackUrl = _configuration["Path:BasePath"] + "/recuperar?c=" + code + "&e=" + request.Email.Trim().ToLower();
                _email.Send(user.Email, "RECUPERAR CONTRASEÑA", $"Hola {user.FirstName}, puede recuperar su contraseña haciendo clic <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>AQUÍ</a>.");
                return Ok(user);
            }
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("resetear")]
        public async Task<ActionResult> Reset(UserRequestModel request)
        {
            var email = request.Email.Trim().ToUpper();
            var code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(request.Code));
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var result = await _userManager.ResetPasswordAsync(user, code, request.Password);
                if (result.Succeeded) return Ok(new { result, user });
                return BadRequest(new { result, user });
            }
            return BadRequest($"El usuario con el correo {request.Email} no existe");
        }

        [AllowAnonymous]
        [HttpPost("activar")]
        public async Task<ActionResult> Activate(UserRequestModel request)
        {
            var email = request.Email.Trim().ToUpper();
            var code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(request.Code));
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var result = await _userManager.ConfirmEmailAsync(user, code);
                if (result.Succeeded)
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    result = await _userManager.ResetPasswordAsync(user, token, request.Password);
                    if (result.Succeeded) return Ok(new { result, user });
                    else return BadRequest(new { result, user });
                }
                else return BadRequest(new { result, user });
            }
            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost("registrar")]
        public async Task<ActionResult> Register(UserRequestModel user)
        {
            var email = user.Email;
            var newUser = new AuthUser
            {
                UserName = email.Trim(),
                Email = email.Trim(),
                FirstName = user.FirstName,
                LastName = user.LastName,
                NormalizedEmail = email.Trim().Normalize().ToUpperInvariant(), // Normalized
                NormalizedUserName = email.Trim().Normalize().ToUpperInvariant(), // Normalized
                EmailConfirmed = false,
                LockoutEnabled = false,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString()
            };
            var result = await _userManager.CreateAsync(newUser, "Acceso*2023");
            if (result.Succeeded)
            {
                var role = await _roleManager.FindByIdAsync(user.RoleId.ToString());
                if (role != null) await _userManager.AddToRoleAsync(newUser, role.NormalizedName);
                // _logger.LogInformation(LoggerEventIds.UserCreated, "User created a new account with password.");
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                var callbackUrl = _configuration["Path:BasePath"] + "/activar?c=" + code + "&e=" + email.Trim().ToLower();
                _email.Send(user.Email, "ACTIVAR CUENTA", $"Hola {user.FirstName}, por favor active su cuenta haciendo clic <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>AQUÍ</a>.");
                return Ok(newUser);
            }
            return BadRequest(new { result, user });
        }

        [AllowAnonymous]
        [HttpPost("ed")]
        public async Task<ActionResult?> Procesar()
        {
            StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
            var str = reader.ReadToEndAsync().Result;
            var uReq = JsonConvert.DeserializeObject<UserRequestModel>(str);
            if (uReq.Id != 0)
            {
                // 202208170339: Actualizando usuario
                var user = await _userManager.FindByEmailAsync(uReq.Email);
                if (user != null)
                {
                    user = (AuthUser)uReq.CopyTo(user, true);
                    // user.CompanyId = uReq.CompanyId;
                    // user.DependenceId = uReq.DependenceId;
                    // user.FirstName = uReq.FirstName;
                    // user.LastName = uReq.LastName;
                    await _userManager.UpdateAsync(user);
                    var role = await _roleManager.FindByIdAsync(uReq.RoleId.ToString());
                    if (role != null)
                    {
                        var roles = await _userManager.GetRolesAsync(user);
                        await _userManager.RemoveFromRolesAsync(user, roles.ToArray());
                        await _userManager.AddToRoleAsync(user, role.NormalizedName);
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
                        uReq.LastName = "ESAP";
                    }
                }
                var newUser = new AuthUser();
                newUser = (AuthUser)uReq.CopyTo(newUser);
                newUser.UserName = newUser.Email.ToLower();
                newUser.NormalizedUserName = newUser.Email.ToUpper();
                var identityResult = await _userManager.CreateAsync(newUser, uReq.Password);
                if (identityResult.Succeeded)
                {
                    var role = await _roleManager.FindByIdAsync(uReq.RoleId.ToString());
                    if (role != null) await _userManager.AddToRoleAsync(newUser, role.NormalizedName);
                    return Ok(newUser);
                }
                else
                {
                    return BadRequest(identityResult.Errors.First());
                }
            }
        }

        [HttpPost("todos/dx")]
        public ActionResult Users()
        {
            var opts = Data.Utils.GetFromRequest(Request);
            opts.PrimaryKey = new[] { "Id" };
            var items = _context.Usuarios.ToList();
            var loadResult = DataSourceLoader.Load(items, opts);
            return Ok(loadResult);
        }

        [HttpPost("porRol")]
        public async Task<ActionResult> AllUsersAsync([FromBody] string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            var items = _context.Usuarios.Where(o => o.RoleId == role.Id).ToList();
            return Ok(items);
        }

        private async Task<ActionResult> GetUserResult(AuthUser user)
        {
            var roleName = (await _userManager.GetRolesAsync(user)).First();
            // var role = await _roleManager.FindByNameAsync(roleName);
            var usuario = _context.Usuarios.First(o => o.Email.Trim().ToLower() == user.Email.Trim().ToLower());
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
        [HttpGet("ping")]
        public ActionResult Ping()
        {
            return Content("OK!", "text/plain;charset=utf-8");
        }
    }

}
