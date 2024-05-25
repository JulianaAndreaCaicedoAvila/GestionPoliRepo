using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using DevExtreme.AspNet.Data;
using SongStock.Api.Authorization;
using SongStock.Api.Services;
using SongStock.Api.Utils;
using SongStock.Data.Core;
using SongStock.Data.Identity;
using SongStock.Data.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SongStock.Data;

// 202402020231: Account confirmation and password recovery in ASP.NET Core
// https://learn.microsoft.com/en-us/aspnet/core/security/authentication/accconfirm?view=aspnetcore-6.0&tabs=visual-studio
namespace SongStock.Api.Controllers {
    [@Authorize]
    [ApiController]
    [Route("Entregable")]
    public class EntregableController : BaseController {
        public EntregableController(DataContext context, IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
            : base(context, httpContextAccessor, configuration) { }

        [HttpPost("ed")] // /api/banco/ed => CREATE - UPDATE
        public ActionResult Edit(Entregable item) {
            var u = User;
            // Registro nuevo: CREATE
            if (item.Id == 0) {
                var obj = (Entregable)item.CopyTo(new Entregable());
                _db.Entregable?.Add(obj);
                _db.SaveChanges();
                return Ok(obj);
            } else {
                // Registro existente: EDIT
                var current = _db.Entregable?.First(o => o.Id == item.Id);
                if (current != null) {
                    var final = (Entregable)item.CopyTo(current);
                    _db.SaveChanges();
                    return Ok(final);
                }

                return Ok(item);
            }
        }

        [Authorization.AllowAnonymous]
        [HttpGet("{itemId?}")] // /api/banco/5 => CREATE - 
        public ActionResult Get(int? itemId = null) {
            var item = _db.Entregable?.FirstOrDefault(o => o.Id == itemId);
            return Ok(item);
        }

        [Authorization.AllowAnonymous]
        [HttpGet("all")] // /api/banco/all => Obtiene todos los items
        public ActionResult GetAll() {
            var items = _db.Entregable?.ToList();
            return Ok(items);
        }

        [HttpPost("dx")] // /api/banco/dx => DevExtreme DataGrid Get
        public ActionResult GetDx() {
            StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
            var str = reader.ReadToEndAsync().Result;
            var opts = JsonConvert.DeserializeObject<LoadOptions>(str);
            opts.PrimaryKey = new[] { "Id" };
            var items = _db.Entregable?.OrderBy(o => o.Titulo).ToList();
            var loadResult = DataSourceLoader.Load(items, opts);
            return Ok(loadResult);
        }
    }
}
