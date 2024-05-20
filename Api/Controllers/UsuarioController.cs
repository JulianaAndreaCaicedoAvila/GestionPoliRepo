using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using DevExtreme.AspNet.Data;
using Poli.Repositorio.Data.Api.Authorization;
using Poli.Repositorio.Data.Api.Services;
using Poli.Repositorio.Data.Api.Utils;
using Poli.Repositorio.Data.Core;
using Poli.Repositorio.Data.Identity;
using Poli.Repositorio.Data.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

// 202402020231: Account confirmation and password recovery in ASP.NET Core
// https://learn.microsoft.com/en-us/aspnet/core/security/authentication/accconfirm?view=aspnetcore-6.0&tabs=visual-studio
namespace Poli.Repositorio.Data.Api.Controllers {
    [@Authorize]
    [ApiController]
    [Route("usuario")]
    public class UsuarioController : BaseController {
        private readonly DataContext _db;
        private readonly IConfiguration _conf;
        private readonly IEmailService _email;
        private readonly IAzureAdService _ad;
        private readonly UserManager<AuthUser> _userManager;
        private readonly RoleManager<AuthRole> _roleManager;
        private bool SendConfirmation(AuthUser user) {
            var code = user.SecurityStamp;
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
            var em = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(user.Email.Trim().ToLower()));
            var callbackUrl = _conf["Path:BasePath"] + "activar?c=" + code + "&e=" + em;
            string body = $"Hola {user.FirstName}!<br/><br/>Para activar su cuenta en SIRECEC 4.0 por favor haga clic <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>AQUÍ</a>.<br/><br/>Muchas gracias!";
            _email.Send(user.Email, "SIRECEC 4.0 - ACTIVAR CUENTA", body);
            return true;
        }
        private async Task<ActionResult> GetUserResult(AuthUser user) {
            var roleName = (await _userManager.GetRolesAsync(user)).First();
            // var role = await _roleManager.FindByNameAsync(roleName);
            var usuario = _db.Usuarios.FirstOrDefault(o => o.Email.Trim().ToLower() == user.Email.Trim().ToLower());
            if (usuario != null) {
                // var participante = _db.Participante.FirstOrDefault(o => o.UsuarioId == usuario.Id);
                // if (participante != null) {
                //     // 202402221911: Obtiene 'DepartamentoId'
                //     var m = _db.Municipio.FirstOrDefault(o => o.Id == participante.MunicipioId);
                //     participante.DepartamentoId = m != null ? m.DepartamentoId : 0;
                // } else {
                //     participante = new Participante();
                // }
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_conf["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
                var claims = new List<Claim> {
                    new Claim(ClaimTypes.Sid, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.GivenName, $"{user.FirstName} {user.LastName}"),
                    new Claim(ClaimTypes.Role, roleName)
                };
                var tokenDescriptor = new JwtSecurityToken(
                    issuer: _conf["Jwt:Issuer"],
                    audience: _conf["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(int.Parse(_conf["Jwt:Expires"])),
                    signingCredentials: credentials);
                var jwt = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
                return Ok(new {
                    user,
                    usuario,
                    // participante,
                    token = jwt
                });
            } else {
                return BadRequest(new {
                    user,
                    usuario
                });
            }
        }

        public UsuarioController(IConfiguration configuration, IAzureAdService ad, UserManager<AuthUser> userManager,
            RoleManager<AuthRole> roleManager, IEmailService email, DataContext context) {
            _ad = ad;
            _db = context;
            _conf = configuration;
            _db = context;
            _email = email;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [AllowAnonymous]
        [HttpGet("roles")]
        public ActionResult GetRoles() {
            var roles = _roleManager.Roles.ToList();
            return Ok(roles);
        }

        [AllowAnonymous]
        [HttpPost("autenticar")]
        public async Task<ActionResult> Authenticate() {
            StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
            var str = reader.ReadToEndAsync().Result;
            var request = JsonConvert.DeserializeObject<UserRequestModel>(str);
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user is null || !user.EmailConfirmed || !user.IsActive || !await _userManager.CheckPasswordAsync(user, request.Password))
                return Forbid();
            // var res = await SendConfirmationAsync(user); // Prueba
            return await GetUserResult(user);
        }

        [AllowAnonymous]
        [HttpPost("email")]
        public async Task<ActionResult> ByEmail(AuthenticateRequest request) {
            // StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
            // var email = reader.ReadToEndAsync().Result;
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null) return BadRequest($"El usuario con el correo {user.Email} no existe");
            if (request.Email.Trim().ToLower().Contains("esap.edu.co") && user.FirstName + " " + user.LastName != request.Name) {
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
        public async Task<ActionResult> Recover(AuthenticateRequest request) {
            var email = request.Email.Trim().ToUpper();
            var user = await _userManager.FindByEmailAsync(email);
            // https://github.com/dotnet/aspnetcore/blob/1dcf7acfacf0fe154adcc23270cb0da11ff44ace/src/Identity/UI/src/Areas/Identity/Pages/V5/Account/ForgotPassword.cshtml.cs
            if (user != null) {
                // For more information on how to enable account confirmation and password reset please
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                var callbackUrl = _conf["Path:BasePath"] + "/recuperar?c=" + code + "&e=" + request.Email.Trim().ToLower();
                _email.Send(user.Email, "RECUPERAR CONTRASEÑA", $"Hola {user.FirstName}, puede recuperar su contraseña haciendo clic <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>AQUÍ</a>.");
                return Ok(user);
            }
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("resetear")]
        public async Task<ActionResult> Reset() {
            StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
            var str = reader.ReadToEndAsync().Result;
            var request = JsonConvert.DeserializeObject<UserRequestModel>(str);
            var email = request.Email.Trim().ToUpper();
            var code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(request.Code));
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null) {
                var result = await _userManager.ResetPasswordAsync(user, code, request.Password);
                if (result.Succeeded) return Ok(new { result, user });
                return BadRequest(new { result, user });
            }
            return BadRequest($"El usuario con el correo {request.Email} no existe");
        }

        [AllowAnonymous]
        [HttpPost("activar")]
        public async Task<ActionResult> Activate() {
            StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
            var str = reader.ReadToEndAsync().Result.Replace("\u0000", "");
            var request = JsonConvert.DeserializeObject<UserRequestModel>(str);
            var email = request.Email.Trim().ToUpper().Replace("\0", "");
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null) {
                var c = request.Code.Replace("\0", "");
                // var bc = WebEncoders.Base64UrlDecode(c);
                // var code = Encoding.UTF8.GetString(bc);
                // var result = await _userManager.ConfirmEmailAsync(user, c);
                var result = string.Equals(user.SecurityStamp, c);
                if (result) {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var result1 = await _userManager.ResetPasswordAsync(user, token, request.Password);
                    if (result1.Succeeded) {
                        user.IsActive = true;
                        user.EmailConfirmed = true;
                        var identityResult = await _userManager.UpdateAsync(user);
                        // if (identityResult.Succeeded) {
                        //     var usr = _db.Participante.FirstOrDefault(o => o.Correo == email.ToLower());
                        //     usr.Activo = true;
                        //     _db.SaveChanges();
                        //     return Ok(new { result, user });
                        // }
                    } else return BadRequest(new { result, user });
                } else return BadRequest(new { result, user });
            }
            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost("confirmar1")]
        public async Task<ActionResult> Confirm1(UserRequestModel request) {
            var email = request.Email.Trim().ToUpper();
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null) {
                var code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(request.Code));
                var result = await _userManager.ConfirmEmailAsync(user, code);
                if (result.Succeeded) {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    result = await _userManager.ResetPasswordAsync(user, token, request.Password);
                    if (result.Succeeded) return Ok(new { result, user });
                    else return BadRequest(new { result, user });
                } else return BadRequest(new { result, user });
            }
            return BadRequest();
        }

        // [AllowAnonymous]
        // [HttpPost("registrar")]
        // public async Task<ActionResult> Register() {
        //     StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
        //     var str = reader.ReadToEndAsync().Result;
        //     var ur = JsonConvert.DeserializeObject<UserRegisterModel>(str);
        //     var modelUser = ur.usuario;
        //     var modelParticipant = ur.participante;
        //     var email = modelParticipant.Correo;
        //     if (!string.IsNullOrEmpty(email) && modelParticipant.UsuarioId == 0) {
        //         // Crea el usuario
        //         var emailNorm = email.Trim().Normalize().ToUpperInvariant(); // Normalizado
        //         var newUser = new AuthUser {
        //             UserName = email.Trim(),
        //             Email = email.Trim(),
        //             FirstName = modelParticipant.Nombres,
        //             LastName = modelParticipant.Apellidos,
        //             NormalizedEmail = emailNorm,
        //             NormalizedUserName = emailNorm,
        //             EmailConfirmed = false, // 202402071752: Debe confirmarse el correo!
        //             LockoutEnabled = false,
        //             PhoneNumber = modelParticipant.Celular,
        //             PhoneNumberConfirmed = false,
        //             SecurityStamp = Guid.NewGuid().ToString(),
        //             ConcurrencyStamp = Guid.NewGuid().ToString(),
        //             IsActive = false
        //         };
        //         var result = await _userManager.CreateAsync(newUser, "Acceso*" + DateTime.Now.Year);

        //         // Si se creó el usuario
        //         if (result.Succeeded) {
        //             // Lo agrega al rol
        //             var role = await _roleManager.FindByIdAsync(modelUser.RoleId.ToString());
        //             if (role != null) await _userManager.AddToRoleAsync(newUser, role.NormalizedName);

        //             // Crea el participante
        //             // var newPart = new Participante();
        //             // newPart = (Participante)modelParticipant.CopyTo(newPart);
        //             // newPart.UsuarioId = newUser.Id; // 'AuthUser' al que esta relacionado
        //             // newPart.CreadoPor = 1;
        //             // newPart.CreadoEl = DateTime.Now;
        //             // newPart.Activo = false;
        //             // _db.Participante.Add(newPart);
        //             // _db.SaveChanges();

        //             // Envía el correo
        //             if (modelUser.GenerateConfirmation) {
        //                 SendConfirmation(newUser);
        //             }

        //             return Ok(newUser);
        //         }
        //         return BadRequest(new { result, ur });
        //     }
        //     // Registro existente: EDIT
        //     // if (modelParticipant.UsuarioId != 0) {
        //     //     var current = _db.Participante.FirstOrDefault(o => o.UsuarioId == modelParticipant.UsuarioId);
        //     //     if (current != null) {
        //     //         var final = (Participante)modelParticipant.CopyTo(current);
        //     //         final.EditadoPor = 1;
        //     //         final.EditadoEl = DateTime.Now;
        //     //         _db.SaveChanges();
        //     //         return Ok(final);
        //     //     }
        //     // }
        //     return Ok();
        // }

        [AllowAnonymous]
        [HttpPost("ed")]
        public async Task<ActionResult?> Procesar() {
            StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
            var str = reader.ReadToEndAsync().Result;
            var uReq = JsonConvert.DeserializeObject<UserRequestModel>(str);
            if (uReq.Id != 0) {
                // 202208170339: Actualizando usuario
                var user = await _userManager.FindByEmailAsync(uReq.Email);
                if (user != null) {
                    user = (AuthUser)uReq.CopyTo(user, true);
                    await _userManager.UpdateAsync(user);
                    var role = await _roleManager.FindByIdAsync(uReq.RoleId.ToString());
                    if (role != null) {
                        var roles = await _userManager.GetRolesAsync(user);
                        await _userManager.RemoveFromRolesAsync(user, roles.ToArray());
                        await _userManager.AddToRoleAsync(user, role.NormalizedName);
                    }
                    if (uReq.Password != null) {
                        await _userManager.RemovePasswordAsync(user);
                        await _userManager.AddPasswordAsync(user, uReq.Password);
                    }
                    if (uReq.GenerateConfirmation) {
                        SendConfirmation(user);
                    }
                    return Ok(user);
                }
                return null;
            } else {
                var user = await _userManager.FindByEmailAsync(uReq.Email);
                if (user != null) return BadRequest($"El usuario con el correo {user.Email} ya existe");
                if (uReq.Email.ToLower().Contains("@esap.edu.co")) {
                    uReq.Password = "Acceso*" + DateTime.Now.Year;
                    var parts = uReq.Email.ToLower().Replace("@esap.edu.co", "").Split(".");
                    // var adUser = await _ad.GetByEmailAsync(uReq.Email.ToLower());
                    if (parts.Length > 1) {
                        uReq.FirstName = parts[0].FirstLetterToUpper();
                        uReq.LastName = parts[1].FirstLetterToUpper();
                    } else {
                        uReq.FirstName = "Usuario";
                        uReq.LastName = "ESAP";
                    }
                }
                var newUser = new AuthUser();
                newUser = (AuthUser)uReq.CopyTo(newUser);
                newUser.UserName = newUser.Email.ToLower();
                newUser.NormalizedEmail = newUser.Email.ToUpper();
                newUser.NormalizedUserName = newUser.Email.ToUpper();
                var identityResult = await _userManager.CreateAsync(newUser, uReq.Password);
                if (identityResult.Succeeded) {
                    var role = await _roleManager.FindByIdAsync(uReq.RoleId.ToString());
                    if (role != null) {
                        await _userManager.AddToRoleAsync(newUser, role.NormalizedName);
                        if (uReq.RoleId == (int)Enum.Rol.Participante) {
                            // Crea el participante
                            var newPart = new Participante();
                            newPart = (Participante)newUser.CopyTo(newPart);
                            newPart.Nombres = newUser.FirstName;
                            newPart.Apellidos = newUser.LastName;
                            newPart.Correo = newUser.Email.Trim().ToLower();
                            newPart.UsuarioId = newUser.Id; // 'AuthUser' al que esta relacionado
                            newPart.CreadoPor = 1;
                            newPart.CreadoEl = DateTime.Now;
                            newPart.Activo = true;
                            // _db.Participante.Add(newPart);
                            _db.SaveChanges();
                        }
                    }
                    if (uReq.GenerateConfirmation) {
                        SendConfirmation(newUser);
                    }
                    return Ok(newUser);
                } else {
                    return BadRequest(identityResult.Errors.First());
                }
            }
        }

        [HttpPost("todos/dx")]
        public ActionResult Users() {
            var opts = Data.Utils.GetFromRequest(Request);
            opts.PrimaryKey = new[] { "Id" };
            var items = _db.Usuarios.Where(o => o.Id > 1).ToList();
            var loadResult = DataSourceLoader.Load(items, opts);
            return Ok(loadResult);
        }

        [AllowAnonymous]
        [HttpPost("porEmail")]
        public async Task<ActionResult> ByEmail([FromBody] string email) {
            var usr = await _userManager.FindByEmailAsync(email);
            return Ok(usr);
        }

        [HttpPost("porRol")]
        public async Task<ActionResult> AllUsersAsync([FromBody] string roleName) {
            var role = await _roleManager.FindByNameAsync(roleName);
            var items = _db.Usuarios.Where(o => o.RoleId == role.Id).ToList();
            return Ok(items);
        }

        [AllowAnonymous]
        [HttpGet("ping")]
        public ActionResult Ping() {
            return Content("OK!", "text/plain;charset=utf-8");
        }
    }

}
