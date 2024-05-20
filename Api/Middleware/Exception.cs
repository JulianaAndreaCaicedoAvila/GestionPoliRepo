using System.Globalization;
using System.Net;
using System.Text.Json;

// 202306031459: https://jasonwatmore.com/post/2022/01/17/net-6-global-error-handler-tutorial-with-example
namespace Poli.Repositorio.Data.Api.Middleware
{
	// custom exception class for throwing application specific exceptions (e.g. for validation) 
	// that can be caught and handled within the application
	public class AppException : Exception
	{
		public AppException() : base() { }

		public AppException(string message) : base(message) { }

		public AppException(string message, params object[] args)
			 : base(string.Format(CultureInfo.CurrentCulture, message, args))
		{
		}
	}

	public class ErrorHandler
	{
		private readonly RequestDelegate _next;

		public ErrorHandler(RequestDelegate next)
		{
			_next = next;
		}

		public async Task Invoke(HttpContext context)
		{
			try
			{
				await _next(context);
			}
			catch (Exception error)
			{
				var response = context.Response;
				response.ContentType = "application/json";

				switch (error)
				{
					case AppException e:
						// custom application error
						response.StatusCode = (int)HttpStatusCode.BadRequest;
						break;
					case KeyNotFoundException e:
						// not found error
						response.StatusCode = (int)HttpStatusCode.NotFound;
						break;
					default:
						// unhandled error
						response.StatusCode = (int)HttpStatusCode.InternalServerError;
						break;
				}

				var result = JsonSerializer.Serialize(new { message = error?.Message });
				await response.WriteAsync(result);
			}
		}
	}
}