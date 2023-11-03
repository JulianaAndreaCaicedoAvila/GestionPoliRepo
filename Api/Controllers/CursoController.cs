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
	[Route("curso")]
	// [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	// CRUD => CREATE READ UPDATE DELETE
	public class CursoController : BaseController
	{
		private readonly DataContext _db;
		private readonly ILogger _logger;
		private readonly IHttpContextAccessor _context;

		public CursoController(DataContext context, IHttpContextAccessor httpContextAccessor, ILogger<CursoController> logger)
		{
			_db = context;
			_logger = logger;
			_context = httpContextAccessor;
		}

		[HttpPost("ed")] // /api/curso/ed => CREATE - UPDATE
		public ActionResult Edit(Curso item)
		{
			var u = User;

			// Registro nuevo: CREATE
			if (item.Id == 0)
			{
				var obj = (Curso)item.CopyTo(new Curso());
				obj.CreadoPor = GetUserId();
				obj.CreadoEl = DateTime.Now;
				_db.Curso.Add(obj);
				_db.SaveChanges();
				return Ok(obj);
			}
			else
			{
				// Registro existente: EDIT
				var current = _db.Curso.First(o => o.Id == item.Id);
				if (current != null)
				{
					var final = (Curso)item.CopyTo(current);
					final.EditadoPor = GetUserId();
					final.EditadoEl = DateTime.Now;
					_db.SaveChanges();
					return Ok(final);
				}

				return Ok(item);
			}
		}

		[HttpPost("by-curso-id")]
		public ActionResult ByCursoId([FromBody] int cursoId)
		{
			var items = _db.CursoTema?.Where(o => o.CursoId == cursoId).ToList();
			return Ok(items);
		}

		[HttpPost("ed-tema")] // /api/curso/ed => CREATE - UPDATE
		public ActionResult EditTemas(CursoTemaModel curso)
		{
			var tId = curso.CursoId;
			var temasActuales = _db.CursoTema.Where(o => o.CursoId == tId).ToList();
			_db.CursoTema.RemoveRange(temasActuales);
			_db.SaveChanges();
			foreach (var item in curso.Temas)
			{
				var obj = (CursoTema)item.CopyTo(new CursoTema());
				obj.CreadoPor = GetUserId();
				obj.CreadoEl = DateTime.Now;
				_db.CursoTema.Add(obj);
				_db.SaveChanges();
			}
			return Ok();
		}

		[HttpPost("ed-encuesta")] // /api/curso/ed => CREATE - UPDATE
		public ActionResult EditEncuestas(CursoEncuestaModel curso)
		{
			var eId = curso.CursoId;
			var encuestasActuales = _db.CursoEncuesta.Where(o => o.CursoId == eId).ToList();
			_db.CursoEncuesta.RemoveRange(encuestasActuales);
			_db.SaveChanges();
			foreach (var item in curso.Encuestas)
			{
				var obj = (CursoEncuesta)item.CopyTo(new CursoEncuesta());
				obj.CreadoPor = GetUserId();
				obj.CreadoEl = DateTime.Now;
				_db.CursoEncuesta.Add(obj);
				_db.SaveChanges();
			}
			return Ok();
		}

		[HttpGet("temas")]
		public ActionResult CursosTemas()
		{
			var items = _db.CursosTemas?.ToList();
			return Ok(items);
		}


		[HttpGet("{itemId?}")] // /api/curso/5 => CREATE - 
		[Authorization.AllowAnonymous]
		public ActionResult Get(int? itemId = null)
		{
			var item = _db.Cursos.FirstOrDefault(o => o.Id == itemId);
			return Ok(item);
		}

		[HttpPost("fechas")] // /curso/fechas
		public ActionResult TemasDx([FromBody] int cursoId)
		{
			var items = _db.CursoFecha?.Where(o => o.CursoId == cursoId).ToList();
			return Ok(items);
		}

		[HttpPost("temas-dx")] // /api/curso/dx => DevExtreme DataGrid Get
		public ActionResult TemasDx()
		{
			StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
			var str = reader.ReadToEndAsync().Result;
			var opts = JsonConvert.DeserializeObject<LoadOptions>(str);
			opts.PrimaryKey = new[] { "Id" };
			var data = JsonConvert.DeserializeObject<GenericModel>(opts.UserData);
			var items = _db.CursosTemas.Where(o => o.CursoId == data.id).OrderBy(o => o.TemaNombre).ToList();
			var loadResult = DataSourceLoader.Load(items, opts);
			return Ok(loadResult);
		}

		[HttpPost("encuestas-dx")] // /api/curso/dx => DevExtreme DataGrid Get
		public ActionResult EncuestasDx()
		{
			StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
			var str = reader.ReadToEndAsync().Result;
			var opts = JsonConvert.DeserializeObject<LoadOptions>(str);
			opts.PrimaryKey = new[] { "Id" };
			var data = JsonConvert.DeserializeObject<GenericModel>(opts.UserData);
			var items = _db.CursosEncuestas.Where(o => o.CursoId == data.id).OrderBy(o => o.Titulo).ToList();
			var loadResult = DataSourceLoader.Load(items, opts);
			return Ok(loadResult);
		}

		[HttpPost("dx")] // /api/curso/dx => DevExtreme DataGrid Get
		public ActionResult GetDx()
		{
			StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
			var str = reader.ReadToEndAsync().Result;
			var opts = JsonConvert.DeserializeObject<LoadOptions>(str);
			dynamic data = JsonConvert.DeserializeObject<dynamic>(opts.UserData);
			opts.PrimaryKey = new[] { "Id" };
			var items = _db.Cursos.OrderBy(o => o.Nombre).ToList();
			var loadResult = DataSourceLoader.Load(items, opts);
			return Ok(loadResult);
		}
	}
}
