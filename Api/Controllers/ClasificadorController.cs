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
	[Route("clasificador")]
	// [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	public class ClasificadorController : ControllerBase
	{
		private readonly DataContext _db;
		private readonly IHttpContextAccessor _context;

		public ClasificadorController(DataContext context, IHttpContextAccessor httpContextAccessor)
		{
			_db = context;
			_context = httpContextAccessor;
		}

		[HttpGet("{tipoId?}")]
		[Authorization.AllowAnonymous]
		public List<Clasificadores> Get(int? tipoId)
		{
			var items = _db.Clasificadores.ToList();
			if (tipoId != null) items = items.Where(o => o.TipoId == tipoId).ToList();
			return items;
		}

		[HttpPost("tipos")]
		public List<ClasificadorTipo> Tipos()
		{
			var items = _db.ClasificadorTipo;
			var subItems = items.OrderBy(o => o.Nombre).ToList();
			return subItems;
		}

		[HttpPost("ed")]
		public ActionResult Edit(Clasificador item)
		{
			var u = User;

			// Nuevo
			if (item.Id == 0)
			{
				var obj = (Clasificador)item.CopyTo(new Clasificador());
				obj.CreadoPor = 1;
				obj.CreadoEl = DateTime.Now;
				_db.Clasificador.Add(obj);
				_db.SaveChanges();
				return Ok(obj);
			}

			var current = _db.Clasificador.First(o => o.Id == item.Id);
			if (current != null)
			{
				var final = (Clasificador)item.CopyTo(current);
				final.EditadoPor = 1;
				final.EditadoEl = DateTime.Now;
				_db.SaveChanges();
				return Ok(final);
			}

			return Ok(item);
		}

		[HttpPost("edt")]
		public ActionResult EditTipo(ClasificadorTipo item)
		{
			var u = User;

			// Nuevo
			if (item.Id == 0)
			{
				var obj = (ClasificadorTipo)item.CopyTo(new ClasificadorTipo());
				obj.CreadoPor = 1;
				obj.CreadoEl = DateTime.Now;
				_db.ClasificadorTipo.Add(obj);
				_db.SaveChanges();
				return Ok(obj);
			}

			var current = _db.ClasificadorTipo.First(o => o.Id == item.Id);
			if (current != null)
			{
				var final = (ClasificadorTipo)item.CopyTo(current);
				final.EditadoPor = 1;
				final.EditadoEl = DateTime.Now;
				_db.SaveChanges();
				return Ok(final);
			}

			return Ok(item);
		}

		[HttpPost("dxt")]
		public ActionResult DxTipos()
		{
			StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
			var str = reader.ReadToEndAsync().Result;
			var opts = JsonConvert.DeserializeObject<LoadOptions>(str);
			opts.PrimaryKey = new[] { "Id" };
			var items = _db.ClasificadorTipo.OrderBy(o => o.Nombre).ToList();
			var loadResult = DataSourceLoader.Load(items, opts);
			return Ok(loadResult);
		}

		[HttpPost("dx/{tipoId}")]
		public ActionResult Users(int? tipoId)
		{
			StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
			var str = reader.ReadToEndAsync().Result;
			var opts = JsonConvert.DeserializeObject<LoadOptions>(str);
			opts.PrimaryKey = new[] { "Id" };
			var items = _db.Clasificadores.ToList();
			if (tipoId != null && tipoId != 0) items = items.Where(o => o.TipoId == tipoId).ToList();
			var loadResult = DataSourceLoader.Load(items, opts);
			return Ok(loadResult);
		}
	}
}
