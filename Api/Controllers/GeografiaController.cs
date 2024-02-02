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
	[Route("geo")]
	// [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	// CRUD => CREATE READ UPDATE DELETE
	public class GeografiaController : BaseController
	{
		public GeografiaController(DataContext context, IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
			: base(context, httpContextAccessor, configuration) { }

		[HttpPost("pais-ed")] // /api/geo/dpto-ed => CREATE - UPDATE
		public ActionResult Edit(Pais item)
		{
			var u = User;

			// Registro nuevo: CREATE
			if (item.Id == 0)
			{
				var obj = (Pais)item.CopyTo(new Pais());
				obj.CreadoPor = GetUserId();
				obj.CreadoEl = DateTime.Now;
				_db.Pais?.Add(obj);
				_db.SaveChanges();
				return Ok(obj);
			}
			else
			{
				// Registro existente: EDIT
				var current = _db.Pais?.First(o => o.Id == item.Id);
				if (current != null)
				{
					var final = (Pais)item.CopyTo(current);
					final.EditadoPor = GetUserId();
					final.EditadoEl = DateTime.Now;
					_db.SaveChanges();
					return Ok(final);
				}

				return Ok(item);
			}
		}

		[Authorization.AllowAnonymous]
		[HttpGet("pais/all")] // /api/banco/all => Obtiene todos los items
		public ActionResult PaisGetAll()
		{
			var items = _db.Pais?.ToList();
			return Ok(items);
		}

		[HttpPost("dpto-ed")] // /api/geo/dpto-ed => CREATE - UPDATE
		public ActionResult Edit(Departamento item)
		{
			var u = User;

			// Registro nuevo: CREATE
			if (item.Id == 0)
			{
				var obj = (Departamento)item.CopyTo(new Departamento());
				obj.CreadoPor = GetUserId();
				obj.CreadoEl = DateTime.Now;
				_db.Departamento?.Add(obj);
				_db.SaveChanges();
				return Ok(obj);
			}
			else
			{
				// Registro existente: EDIT
				var current = _db.Departamento?.First(o => o.Id == item.Id);
				if (current != null)
				{
					var final = (Departamento)item.CopyTo(current);
					final.EditadoPor = GetUserId();
					final.EditadoEl = DateTime.Now;
					_db.SaveChanges();
					return Ok(final);
				}

				return Ok(item);
			}
		}

		[HttpPost("dptos-ed")] // /api/geo/dpto-ed => CREATE - UPDATE
		public ActionResult EditDptos(List<Departamento> items)
		{
			foreach (Departamento item in items)
			{
				// Registro existente: EDIT
				var current = _db.Departamento?.First(o => o.Id == item.Id);
				if (current != null)
				{
					var final = (Departamento)item.CopyTo(current);
					final.EditadoPor = GetUserId();
					final.EditadoEl = DateTime.Now;
					_db.SaveChanges();
				}
			}
			return Ok();
		}

		[Authorization.AllowAnonymous]
		[HttpGet("dpto/all")] // /api/banco/all => Obtiene todos los items
		public ActionResult DptoGetAll()
		{
			var items = _db.Departamento?.ToList();
			return Ok(items);
		}

		[Authorization.AllowAnonymous]
		[HttpPost("dpto/by-pais-id")] // /api/geo/mun/by-dpto-id => Obtiene todos los items
		public ActionResult ByPaisId(int paisId)
		{
			var items = _db.Departamento?.Where(o => o.PaisId == paisId).ToList();
			return Ok(items);
		}

		[HttpPost("mun-ed")] // /api/geo/dpto-ed => CREATE - UPDATE
		public ActionResult Edit(Municipio item)
		{
			var u = User;

			// Registro nuevo: CREATE
			if (item.Id == 0)
			{
				var obj = (Municipio)item.CopyTo(new Municipio());
				obj.CreadoPor = GetUserId();
				obj.CreadoEl = DateTime.Now;
				_db.Municipio?.Add(obj);
				_db.SaveChanges();
				return Ok(obj);
			}
			else
			{
				// Registro existente: EDIT
				var current = _db.Municipio?.First(o => o.Id == item.Id);
				if (current != null)
				{
					var final = (Municipio)item.CopyTo(current);
					final.EditadoPor = GetUserId();
					final.EditadoEl = DateTime.Now;
					_db.SaveChanges();
					return Ok(final);
				}

				return Ok(item);
			}
		}

		[Authorization.AllowAnonymous]
		[HttpGet("mun/all")] // /api/banco/all => Obtiene todos los items
		public ActionResult MunGetAll()
		{
			var items = _db.Municipio?.ToList();
			return Ok(items);
		}

		[Authorization.AllowAnonymous]
		[HttpPost("mun/by-dpto-id")] // /api/geo/mun/by-dpto-id => Obtiene todos los items
		public ActionResult ByDptoId(int dptoId)
		{
			var items = _db.Municipio?.Where(o => o.DepartamentoId == dptoId).ToList();
			return Ok(items);
		}

		[Authorization.AllowAnonymous]
		[HttpPost("dx-dpto")] // /api/banco/dx => DevExtreme DataGrid Get
		public ActionResult GetDxDpto()
		{
			StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
			var str = reader.ReadToEndAsync().Result;
			var opts = JsonConvert.DeserializeObject<LoadOptions>(str);
			opts.PrimaryKey = new[] { "Id" };
			var items = _db.Departamento?.OrderBy(o => o.Nombre).ToList();
			var loadResult = DataSourceLoader.Load(items, opts);
			return Ok(loadResult);
		}

		[Authorization.AllowAnonymous]
		[HttpPost("dx-mun")] // /api/banco/dx => DevExtreme DataGrid Get
		public ActionResult GetDxMun()
		{
			StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
			var str = reader.ReadToEndAsync().Result;
			var opts = JsonConvert.DeserializeObject<LoadOptions>(str);
			opts.PrimaryKey = new[] { "MunicipioId" };
			var items = _db.Municipios?.OrderBy(o => o.MunicipioNombre).ToList();
			var loadResult = DataSourceLoader.Load(items, opts);
			return Ok(loadResult);
		}
	}
}
