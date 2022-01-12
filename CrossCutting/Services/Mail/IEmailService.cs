using System.Collections.Generic;
using System.Net.Mail;
using System.Threading.Tasks;

namespace CrossCutting.Services.Mail
{
    public interface IEmailService
    {
        Task SendEmail(MailAddress sender, MailAddress destinatary, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null);
        Task SendEmail(MailAddress destinatary, string subject, string content, bool asHtml = true);
        Task SendEmail(string destinatary, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null);
        Task SendEmail(string sender, string destinatary, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null);
        Task SendEmail(MailMessage message);
        Task SendEmail(string destinatary, string subject, string content, bool asHtml = true);
        Task SendEmail(string destinatary, string destinataryName, string subject, string content, bool asHtml = true);
        Task SendEmail(string sender, string destinatary, string destinataryName, string subject, string content, bool asHtml = true);
        Task SendEmail(string sender, string senderName, string destinatary, string destinataryName, string subject, string content, bool asHtml = true);
    }
}