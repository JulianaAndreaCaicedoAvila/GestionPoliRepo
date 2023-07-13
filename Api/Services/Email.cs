namespace ESAP.Sirecec.Data.Api.Services;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

public interface IEmailService
{
	void Send(string to, string subject, string html);
}

public class EmailService : IEmailService
{

	private readonly IConfiguration _configuration;

	public EmailService(IConfiguration configuration)
	{
		_configuration = configuration;
	}

	public void Send(string to, string subject, string body)
	{
		// Create message
		var email = new MimeMessage();
		var fromAddress = new MailboxAddress(_configuration["Email:From"], _configuration["Email:SmtpUser"]);
		email.From.Add(fromAddress);
		email.To.Add(MailboxAddress.Parse(to));
		email.Subject = subject;
		email.Body = new TextPart(TextFormat.Html) { Text = body };

		// 202208141548: Template
		// using (StreamReader SourceReader = System.IO.File.OpenText(path to your file)) {
		// 	builder.HtmlBody = SourceReader.ReadToEnd();
		// }

		// Send email
		using var smtp = new SmtpClient();
		smtp.Connect(_configuration["Email:SmtpHost"], int.Parse(_configuration["Email:SmtpPort"]), SecureSocketOptions.StartTls);
		smtp.Authenticate(_configuration["Email:SmtpUser"], _configuration["Email:SmtpPassword"]);
		smtp.Send(email);
		smtp.Disconnect(true);
	}
}