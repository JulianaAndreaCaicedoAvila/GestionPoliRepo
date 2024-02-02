using System.Text;
using DevExtreme.AspNet.Data;
using ESAP.Sirecec.Data;
using ESAP.Sirecec.Data.Api.Authorization;
using ESAP.Sirecec.Data.Api.Utils;
using ESAP.Sirecec.Data.Core;
using ESAP.Sirecec.Data.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Newtonsoft.Json;

namespace ESAP.Sirecec.Data.Api.Controllers
{
	[@Authorize]
	[ApiController]
	[Route("encuesta")]
	// [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	// CRUD => CREATE READ UPDATE DELETE
	public class EncuestaController : BaseController
	{
		private readonly DataContext _db;
		private readonly IHttpContextAccessor _context;

		public EncuestaController(DataContext context, IHttpContextAccessor httpContextAccessor)
		{
			_db = context;
			_context = httpContextAccessor;
		}

		[HttpPost("ed")] // /api/curso/ed => CREATE - UPDATE
		public ActionResult Edit(Encuesta item)
		{
			var u = User;

			// Registro nuevo: CREATE
			if (item.Id == 0)
			{
				var obj = (Encuesta)item.CopyTo(new Encuesta());
				obj.CreadoPor = GetUserId();
				obj.CreadoEl = DateTime.Now;
				_db.Encuesta.Add(obj);
				_db.SaveChanges();
				return Ok(obj);
			}
			else
			{
				// Registro existente: EDIT
				var current = _db.Encuesta.First(o => o.Id == item.Id);
				if (current != null)
				{
					var final = (Encuesta)item.CopyTo(current);
					final.EditadoPor = GetUserId();
					final.EditadoEl = DateTime.Now;
					_db.SaveChanges();
					return Ok(final);
				}

				return Ok(item);
			}
		}

		[HttpPost("by-encuesta-id")] // /api/geo/mun/by-dpto-id => Obtiene todos los items
		public ActionResult ByEncuestaId([FromBody] int encuestaId)
		{
			var items = _db.EncuestaPregunta?.Where(o => o.EncuestaId == encuestaId).ToList();
			return Ok(items);
		}

		[HttpPost("ed-pr")] // /api/curso/ed => CREATE - UPDATE
		public ActionResult EditPreguntas(EncuestaModel encuesta)
		{
			var eId = encuesta.EncuestaId;
			var preguntasActuales = _db.EncuestaPregunta.Where(o => o.EncuestaId == eId).ToList();
			_db.EncuestaPregunta.RemoveRange(preguntasActuales);
			_db.SaveChanges();
			foreach (var item in encuesta.Preguntas)
			{
				var obj = (EncuestaPregunta)item.CopyTo(new EncuestaPregunta());
				obj.CreadoPor = GetUserId();
				obj.CreadoEl = DateTime.Now;
				_db.EncuestaPregunta.Add(obj);
				_db.SaveChanges();
			}
			return Ok();
		}

		[HttpGet("all")] // /api/encuesta/all => Obtiene todos los items
		[Authorization.AllowAnonymous]
		public ActionResult GetAll()
		{
			var items = _db.Encuesta?.ToList();
			return Ok(items);
		}

		[HttpGet("{itemId?}")] // /api/curso/5 => CREATE - 
		[Authorization.AllowAnonymous]
		public ActionResult Get(int? itemId = null)
		{
			var item = _db.Encuesta.FirstOrDefault(o => o.Id == itemId);
			return Ok(item);
		}

		[HttpPost("dx")] // /api/curso/dx => DevExtreme DataGrid Get
		public ActionResult GetDx()
		{
			StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
			var str = reader.ReadToEndAsync().Result;
			var opts = JsonConvert.DeserializeObject<LoadOptions>(str);
			opts.PrimaryKey = new[] { "Id" };
			var items = _db.Encuestas.OrderBy(o => o.Titulo).ToList();
			var loadResult = DataSourceLoader.Load(items, opts);
			return Ok(loadResult);
		}
	}
}
