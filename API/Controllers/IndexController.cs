using Microsoft.AspNetCore.Mvc;

namespace Pnsv.Api.Controllers {
	[Route("")]
	[ApiController]
	[ApiExplorerSettings(IgnoreApi = true)]
	public class IndexController : ControllerBase {
		[HttpGet]
		public ActionResult Get() {
			return Content("ANSV PNSV API v1.0", "text/plain");
		}
	}
}
