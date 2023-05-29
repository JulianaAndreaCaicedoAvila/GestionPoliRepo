using Microsoft.AspNetCore.Mvc;

namespace ESAP.Sirecec.Data.API.Controllers
{
	[Route("")]
	[ApiController]
	[ApiExplorerSettings(IgnoreApi = true)]
	public class IndexController : ControllerBase
	{
		[HttpGet]
		public ActionResult Get()
		{
			return Content("ESAP SIRECEC API v1.0", "text/plain");
		}
	}
}
