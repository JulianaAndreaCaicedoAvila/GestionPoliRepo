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
	[Route("cursoFecha")]
	// [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	// CRUD => CREATE READ UPDATE DELETE
	public class CursoFechaController : BaseController
	{
		private readonly DataContext _db;
		private readonly IHttpContextAccessor _context;

		public CursoFechaController(DataContext context, IHttpContextAccessor httpContextAccessor)
		{
			_db = context;
			_context = httpContextAccessor;
		}

		[HttpPost("ed")] // /api/curso/ed => CREATE - UPDATE
		public ActionResult Edit(List<CursoFecha> items)
		{
			var res = new List<CursoFecha> { };

			foreach (CursoFecha item in items)
			{
				// Registro nuevo: CREATE
				if (item.Id == 0)
				{
					var obj = (CursoFecha)item.CopyTo(new CursoFecha());
					obj.CreadoPor = GetUserId();
					obj.CreadoEl = DateTime.Now;
					_db.CursoFecha.Add(obj);
					_db.SaveChanges();
					res.Add(obj);
				}
				else
				{
					// Registro existente: EDIT
					var current = _db.CursoFecha.First(o => o.Id == item.Id);
					if (current != null)
					{
						var final = (CursoFecha)item.CopyTo(current);
						final.EditadoPor = GetUserId();
						final.EditadoEl = DateTime.Now;
						_db.SaveChanges();
						res.Add(final);
					}
				}
			}
			return Ok(res);
		}

		[HttpGet("{itemId?}")] // /api/curso/5 => CREATE - 
		[Authorization.AllowAnonymous]
		public ActionResult Get(int? itemId = null)
		{
			var item = _db.CursoFecha.FirstOrDefault(o => o.Id == itemId);
			return Ok(item);
		}

		[HttpPost("dx")] // /api/curso/dx => DevExtreme DataGrid Get
		public ActionResult GetDx()
		{
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
