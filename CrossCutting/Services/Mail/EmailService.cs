using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;
using CrossCutting.Extensions;
using CrossCutting.Helpers;
using CrossCutting.Services.Configuration;
using Microsoft.Extensions.Logging;

namespace CrossCutting.Services.Mail
{
    public class EmailService : IEmailService
    {
        readonly SmtpConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(SmtpConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        private SmtpClient MailClient
        {
            get
            {
                var client = new SmtpClient(_configuration.Server);
                if (_configuration.Port.HasValue)
                {
                    client.Port = _configuration.Port.Value;
                }
                client.Credentials = new System.Net.NetworkCredential(_configuration.User, _configuration.Password);
                if (_configuration.EnableSsl.HasValue)
                {
                    client.EnableSsl = _configuration.EnableSsl.Value;
                }
                return client;
            }
        }

        public async Task SendEmail(MailAddress sender, MailAddress destinatary, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null)
        {
            using var mail = new MailMessage(sender, destinatary);
            mail.ReplyToList.Add(sender);
            mail.Subject = subject;
            mail.Body = content;
            mail.IsBodyHtml = asHtml && (content?.Contains('<') ?? false);
            if (mail.IsBodyHtml)
            {
                var message = File.ReadAllText(_configuration.TemplatePath)
                    .Replace("%content%", content)
                    .Replace("%title%", subject);
                mail.Body = message;
            }
            var streamsToDispose = new List<Stream>();
            if (attachments?.Count > 0)
            {
                foreach (var attachment in attachments)
                {
                    ContentType type = FileHelper.GetMimeTypeFromFileName(attachment.Key);
                    var stream = attachment.Value.ToStream();
                    streamsToDispose.Add(stream);
                    var file = new Attachment(stream, type)
                    {
                        Name = attachment.Key
                    };

                    mail.Attachments.Add(file);
                }

            }
            await SendEmailAsync(mail);

            foreach (var stream in streamsToDispose)
            {
                stream.Dispose();
            }

        }

        public Task SendEmail(string destinatary, string subject, string content, bool asHtml = true)
        {
            return SendEmail(new MailAddress(_configuration.MailAddress), new MailAddress(destinatary), subject, content, asHtml);
        }

        public Task SendEmail(string destinatary, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null)
        {
            return SendEmail(new MailAddress(_configuration.MailAddress), new MailAddress(destinatary), subject, content, asHtml, attachments);
        }

        public Task SendEmail(string sender, string destinatary, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null)
        {
            return SendEmail(new MailAddress(_configuration.MailAddress, sender), new MailAddress(destinatary), subject, content, asHtml, attachments);
        }
        public Task SendEmail(string destinatary, string destinataryName, string subject, string content, bool asHtml = true)
        {
            return SendEmail(new MailAddress(_configuration.MailAddress), new MailAddress(destinatary, destinatary + " " + destinataryName), subject, content, asHtml);
        }

        public Task SendEmail(string sender, string senderName, string destinatary, string destinataryName, string subject, string content, bool asHtml = true)
        {
            return SendEmail(new MailAddress(_configuration.MailAddress, sender + " " + senderName), new MailAddress(destinatary, destinatary + " " + destinataryName), subject, content, asHtml);
        }

        public Task SendEmail(string sender, string destinatary, string destinataryName, string subject, string content, bool asHtml = true)
        {
            return SendEmail(new MailAddress(_configuration.MailAddress, sender + " " + destinataryName), new MailAddress(destinatary), subject, content, asHtml);
        }

        public Task SendEmail(MailAddress destinatary, string subject, string content, bool asHtml = true)
        {
            return SendEmail(new MailAddress(_configuration.MailAddress), destinatary, subject, content, asHtml);
        }

        public Task SendEmail(MailMessage message)
        {
            return SendEmailAsync(message);
        }
        public async Task SendEmailAsync(MailMessage message)
        {
            try
            {
                await MailClient.SendMailAsync(message);
                _logger.LogInformation("Renvio de senha efetuado com sucesso");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }
        }

    }
}




