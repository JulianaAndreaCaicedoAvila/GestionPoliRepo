using System.Text;
using DevExtreme.AspNet.Data;
using ESAP.Sirecec.Data;
using ESAP.Sirecec.Data.Api.Authorization;
using ESAP.Sirecec.Data.Api.Utils;
using ESAP.Sirecec.Data.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Newtonsoft.Json;

namespace ESAP.Sirecec.Data.Api.Controllers {
	[@Authorize]
	[ApiController]
	[Route("cursoFecha")]
	// [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	// CRUD => CREATE READ UPDATE DELETE
	public class CursoFechaController : BaseController {
		private readonly DataContext _db;
		private readonly IHttpContextAccessor _context;

		public static List<CursoFecha> Fechas(Curso curso, DataContext _db) {
			var fechas = new List<CursoFecha> { };
			// Round to nearest five => https://stackoverflow.com/a/1531724/2150329
			var top = 0;
			var plain = 100 / curso.NumeroDias;
			var pond = 5 * (int)Math.Round((decimal)(plain / 5.0));
			for (int x = 0; x < curso.NumeroDias; x++) {
				top += pond;
				var actualPond = pond;
				if (x + 1 == curso.NumeroDias && top != 100) { // Ultimo elemento
					actualPond = 100 - (top - pond);
					// if (top != 100) actualPond = 100 - (top - pond);
					// if (top < 100) actualPond = 100 - (top - pond);
				}
				fechas.Add(new CursoFecha {
					Id = 0,
					CursoId = curso.Id,
					FechaClase = curso.FechaInicio.AddDays(x),
					Ponderacion = actualPond
				});
			}
			return CursoFechas(fechas, _db);
		}

		public static List<CursoFecha> CursoFechas(List<CursoFecha> items, DataContext _db) {
			var res = new List<CursoFecha> { };
			if (items.Any()) {
				var actuales = _db.CursoFecha.Where(o => o.CursoId == items.First().CursoId);
				_db.RemoveRange(actuales);
				_db.SaveChanges();
				foreach (var item in items) {
					item.CreadoPor = GetUserId();
					item.CreadoEl = DateTime.Now;
					_db.CursoFecha.Add(item);
					_db.SaveChanges();
					res.Add(item);
				}
			}
			return res;
		}

		public CursoFechaController(DataContext context, IHttpContextAccessor httpContextAccessor) {
			_db = context;
			_context = httpContextAccessor;
		}

		[HttpPost("ed")] // /api/curso/ed => CREATE - UPDATE
		public ActionResult Edit(List<CursoFecha> items) {
			var res = CursoFechas(items, _db);
			return Ok(res);
		}

		[HttpGet("{itemId?}")] // /api/curso/5 => CREATE - 
		[Authorization.AllowAnonymous]
		public ActionResult Get(int? itemId = null) {
			var item = _db.CursoFecha.FirstOrDefault(o => o.Id == itemId);
			return Ok(item);
		}

		[HttpPost("dx")] // /api/curso/dx => DevExtreme DataGrid Get
		public ActionResult GetDx() {
			StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
			var str = reader.ReadToEndAsync().Result;
			var opts = JsonConvert.DeserializeObject<LoadOptions>(str);
			opts.PrimaryKey = new[] { "Id" };
			var items = _db.CursoFecha.OrderBy(o => o.CursoId).ToList();
			var loadResult = DataSourceLoader.Load(items, opts);
			return Ok(loadResult);
		}
	}
}
