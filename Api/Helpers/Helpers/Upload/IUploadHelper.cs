using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Helpers.Upload
{
    public interface IUploadHelper
    {
        Task<UploadData> Upload(List<IFormFile> files);
        T GetData<T>(IFormCollection data);
        Task<UploadFormData<T>> Upload<T>(List<IFormFile> files, IFormCollection data = null) where T : class;
    }
}
