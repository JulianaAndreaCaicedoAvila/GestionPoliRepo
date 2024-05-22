namespace SongStock.Api.Services;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

public interface IEmailService {
	void Send(string to, string subject, string html);
}

public class EmailService : IEmailService {

	private readonly IConfiguration _conf;

	public EmailService(IConfiguration configuration) {
		_conf = configuration;
	}

	public void Send(string to, string subject, string body) {
		// 202402020448: Template
		string html = File.ReadAllText(Path.Combine(_conf["Path:FilesPath"], "tpl/mail.min.html"));
		var bp = _conf["Path:BasePath"];
		var bpt = "https://media.nemedi.com/sirecec4";
		html = html.Replace("{BasePath}", bp.Contains("esap.edu.co") ? bp : bpt);
		// html = html.Replace("{BasePath}", bp);
		html = html.Replace("{Year}", DateTime.Now.Year.ToString());
		html = html.Replace("{Body}", body);

		// Create message
		var email = new MimeMessage();
		var fromAddress = new MailboxAddress(_conf["Email:From"], _conf["Email:SmtpUser"]);
		email.From.Add(fromAddress);
		email.To.Add(MailboxAddress.Parse(to));
		email.Subject = subject;
		email.Body = new TextPart(TextFormat.Html) { Text = html };

		// Send email
		using var smtp = new SmtpClient();
		smtp.Connect(_conf["Email:SmtpHost"], int.Parse(_conf["Email:SmtpPort"]), SecureSocketOptions.StartTls);
		smtp.Authenticate(_conf["Email:SmtpUser"], _conf["Email:SmtpPassword"]);
		smtp.Send(email);
		smtp.Disconnect(true);

	}
}