using System;

namespace Api.Helpers.Upload
{
    public class UploadFile
    {
        public string Name { get; set; }
        public long Size { get; set; }
        public string FileName { get; set; }
        public byte[] Bytes { get; set; }
        public string MimeType { get; set; }
        public string Extension { get; set; }
        public Guid? ProcessId { get; set; }
    }
}
