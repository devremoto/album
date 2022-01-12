using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;
using System;
using Application.ViewModels.Common;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Microsoft.Extensions.Primitives;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Globalization;
using CrossCutting.Extensions;
using Api.Helpers.Image;

namespace Api.Helpers.Upload
{
    public class UploadHelper : IUploadHelper
    {
        public async Task<UploadData> Upload(List<IFormFile> files)
        {
            var result = await Upload<object>(files);
            return new UploadData { Files = result.Files };
        }

        public T GetData<T>(IFormCollection data)
        {
            if (data == null)
            {
                return default;
            }

            _ = data?.Files?.Cast<IFormFile>()?.ToList() ?? new List<IFormFile>(0);
            var key = data.Keys.FirstOrDefault();
            T entity = default;
            if (key != null)
            {
                var json = data[key].FirstOrDefault();
                entity = json.JsonDeserialize<T>();
            }
            return entity;
        }
        public async Task<UploadFormData<T>> Upload<T>(List<IFormFile> files, IFormCollection data = null) where T : class
        {
            var fileList = new List<UploadFile>();
            long size = files.Sum(f => f.Length);

            // full path to file in temp location
            var filePath = Path.GetTempFileName();

            foreach (var formFile in files)
            {
                if (formFile != null)
                {
                    using var stream = new MemoryStream();//(filePath, FileMode.Create);

                    await formFile.CopyToAsync(stream);

                    fileList.Add(new UploadFile
                    {
                        Name = formFile.Name,
                        Size = formFile.Length,
                        FileName = formFile.FileName,
                        Bytes = stream.ToArray(),
                        MimeType = formFile.ContentType,
                        Extension = formFile.ContentType.GetExtension()
                    });
                }
            }
            var entity = GetData<T>(data);
            return await Task.FromResult(new UploadFormData<T> { Entity = entity ?? default, Files = fileList });
        }

        public async Task<IActionResult> Upload(HttpRequest request, ControllerContext context, string uploadFolder)
        {
            try
            {
                string fileName = string.Empty;
                var ListFileViewModel = new List<FileViewModel>();
                if (!MultipartRequestHelper.IsMultipartContentType(request.ContentType))
                {
                    return BadRequest($"Expected a multipart request, but got {request.ContentType}");
                }

                // Used to accumulate all the form url encoded key value pairs in the
                // request.
                var formAccumulator = new KeyValueAccumulator();

                var boundary = MultipartRequestHelper.GetBoundary(
                    MediaTypeHeaderValue.Parse(request.ContentType));
                var reader = new MultipartReader(boundary, request.Body);

                var section = await reader.ReadNextSectionAsync();
                while (section != null)
                {
                    var hasContentDispositionHeader = ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out ContentDispositionHeaderValue contentDisposition);

                    if (hasContentDispositionHeader)
                    {
                        if (MultipartRequestHelper.HasFileContentDisposition(contentDisposition))
                        {

                            var file = section.AsFileSection();
                            fileName = file.FileName;

                            ListFileViewModel.Add(new FileViewModel
                            {
                                FileName = file.FileName,
                                Size = file.Section.Body.Length,
                                Type = file.Section.ContentType
                            });
                            string dir = uploadFolder;
                            Directory.CreateDirectory(dir);
                            var path = Path.Combine(dir, fileName); ;
                            using (var targetStream = System.IO.File.Create(path))
                            {
                                await section.Body.CopyToAsync(targetStream);

                            }

                            if (file.Section.ContentType.ToLower().Contains("image"))
                                ImageHelper.CorrectRotation(path);
                        }
                        else if (MultipartRequestHelper.HasFormDataContentDisposition(contentDisposition))
                        {

                            var key = HeaderUtilities.RemoveQuotes(contentDisposition.Name);
                            var encoding = GetEncoding(section);
                            using var streamReader = new StreamReader(
                                section.Body,
                                encoding,
                                detectEncodingFromByteOrderMarks: true,
                                bufferSize: 1024,
                                leaveOpen: true);
                            var value = await streamReader.ReadToEndAsync();
                            if (string.Equals(value, "undefined", StringComparison.OrdinalIgnoreCase))
                            {
                                value = string.Empty;
                            }
                            formAccumulator.Append(key.Value, value);

                            if (formAccumulator.ValueCount > 70)
                            {
                                throw new InvalidDataException($"Form key count limit 70 exceeded.");
                            }
                        }
                    }

                    section = await reader.ReadNextSectionAsync();
                }

                UploadViewModel model = new() { };
                StringValues values = new();
                var formValueProvider = new FormValueProvider(
                    BindingSource.Form,
                    new FormCollection(formAccumulator.GetResults()),
                    CultureInfo.CurrentCulture);

                formAccumulator.GetResults().TryGetValue("model", out values);
                if (values.Count > 0)
                {
                    model = values.ToString().JsonDeserialize<UploadViewModel>();
                }


                int i = 0;
                foreach (var file in model.Files)
                {
                    ListFileViewModel[i].InputFileField = file.InputFileField;
                    ListFileViewModel[i].Index = i;
                }

                return new JsonResult(new UploadViewModel { Entity = model.Entity, Files = ListFileViewModel });
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        static BadRequestObjectResult BadRequest(object error)
        {
            var result = new BadRequestObjectResult(error);
            return result;
        }

        private static Encoding GetEncoding(MultipartSection section)
        {
            var hasMediaTypeHeader = MediaTypeHeaderValue.TryParse(section.ContentType, out MediaTypeHeaderValue mediaType);

            if (!hasMediaTypeHeader || Encoding.UTF8.Equals(mediaType.Encoding))
            {
                return Encoding.UTF8;
            }
            return mediaType.Encoding;
        }


    }
}
