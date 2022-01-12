using CrossCutting.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace CrossCutting.ApiClient
{
    public static class ApiHelper
    {
        public static async Task<T> Get<T>(string url, AuthenticationHeaderValue auth = null)
        {
            using var client = new HttpClient();
            Headers(client, auth);

            HttpResponseMessage response = await client.GetAsync(url);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                return result.JsonDeserialize<T>();
            }
            return default;
        }

        public static async Task<string> GetString(string url)
        {
            string result = null;
            using var client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(url);
            if (response.IsSuccessStatusCode)
            {
                result = await response.Content.ReadAsStringAsync();
            }
            var cookies = GetCookies(url);
            return result;
        }

        public static IEnumerable<Cookie> GetCookies(string url)
        {
            IEnumerable<Cookie> responseCookies = new List<Cookie>();
            try
            {
                CookieContainer cookies = new();
                HttpClientHandler handler = new();
                handler.CookieContainer = cookies;
                Uri uri = new(url);
                HttpClient client = new(handler);
                HttpResponseMessage response = client.GetAsync(uri).Result;

                responseCookies = cookies.GetCookies(uri).Cast<Cookie>();
                foreach (Cookie cookie in responseCookies)
                {
                    Console.WriteLine($"{cookie.Name} - {cookie.Value}");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return responseCookies;

        }

        private static void Headers(HttpClient client, AuthenticationHeaderValue auth)
        {
            client.DefaultRequestHeaders.Accept.Clear();
            if (auth != null)
            {
                client.DefaultRequestHeaders.Authorization = auth;
            }
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public static async Task<TResult> Post<T, TResult>(string url, T obj, AuthenticationHeaderValue auth = null)
        {
            using var client = new HttpClient();
            Headers(client, auth);
            var stringContent = new StringContent(obj.JsonSerialize());
            HttpResponseMessage response = await client.PostAsync(url, stringContent);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                return result.JsonDeserialize<TResult>();
            }
            return default;
        }
    }
}
