using Microsoft.AspNetCore.Mvc;

namespace Poli.Repositorio.Data.Api.Controllers
{
	[Route("")]
	[ApiController]
	[ApiExplorerSettings(IgnoreApi = true)]
	public class IndexController : BaseController
	{
		[HttpGet]
		public ActionResult Get()
		{
			return Content("ESAP SIRECEC API v1.0", "text/plain");
		}
	}
}
