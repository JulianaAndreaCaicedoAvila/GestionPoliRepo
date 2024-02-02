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

namespace ESAP.Sirecec.Data.Api.Controllers
{
	[@Authorize]
	[ApiController]
	[Route("tema")]
	// [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	// CRUD => CREATE READ UPDATE DELETE
	public class TemaController : BaseController
	{
		private readonly DataContext _db;
		private readonly IHttpContextAccessor _context;

		public TemaController(DataContext context, IHttpContextAccessor httpContextAccessor)
		{
			_db = context;
			_context = httpContextAccessor;
		}

		[HttpPost("ed")] // /api/curso/ed => CREATE - UPDATE
		public ActionResult Edit(Tema item)
		{
			var u = User;

			// Registro nuevo: CREATE
			if (item.Id == 0)
			{
				var obj = (Tema)item.CopyTo(new Tema());
				obj.CreadoPor = GetUserId();
				obj.CreadoEl = DateTime.Now;
				_db.Tema.Add(obj);
				_db.SaveChanges();
				return Ok(obj);
			}
			else
			{
				// Registro existente: EDIT
				var current = _db.Tema.First(o => o.Id == item.Id);
				if (current != null)
				{
					var final = (Tema)item.CopyTo(current);
					final.EditadoPor = GetUserId();
					final.EditadoEl = DateTime.Now;
					_db.SaveChanges();
					return Ok(final);
				}

				return Ok(item);
			}
		}

		[HttpGet("all")]
		[Authorization.AllowAnonymous]
		public ActionResult GetAll()
		{
			var items = _db.Temas?.ToList();
			return Ok(items);
		}

		[HttpGet("{itemId?}")] // /api/curso/5 => CREATE - 
		[Authorization.AllowAnonymous]
		public ActionResult Get(int? itemId = null)
		{
			var item = _db.Tema.FirstOrDefault(o => o.Id == itemId);
			return Ok(item);
		}

		[HttpPost("dx")] // /api/curso/dx => DevExtreme DataGrid Get
		public ActionResult GetDx()
		{
			StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
			var str = reader.ReadToEndAsync().Result;
			var opts = JsonConvert.DeserializeObject<LoadOptions>(str);
			opts.PrimaryKey = new[] { "Id" };
			var items = _db.Temas.OrderBy(o => o.Nombre).ToList();
			var loadResult = DataSourceLoader.Load(items, opts);
			return Ok(loadResult);
		}
	}
}
