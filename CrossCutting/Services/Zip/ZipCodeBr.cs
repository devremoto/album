
using System.Net.Http;
using System.Threading.Tasks;

namespace CrossCutting.Services.Zip
{
    public class ZipCodeBr : IZipCode
    {
        public string Json(string code)
        {
            return Get(code).Result;
        }

        public static async Task<string> Get(string code)
        {
            using HttpClient client = new();
            return await client.GetStringAsync($"https://viacep.com.br/ws/{code}/json/");
        }
    }
}
