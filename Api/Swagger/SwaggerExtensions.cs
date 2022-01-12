using Domain.Settings;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;

namespace Api.Swagger
{
    public static class SwaggerExtensions
    {

        public static IServiceCollection AddSwagger(this IServiceCollection services, AppSettings settings)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = settings.ApiName, Version = "v1" });
                if (settings.UseAuthority)
                {
                    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                    {
                        Type = SecuritySchemeType.OAuth2,
                        Scheme = "Bearer",

                        OpenIdConnectUrl = new Uri($"{settings.Authority}/.well-known/openid-configuration/jwks"),
                        Flows = new OpenApiOAuthFlows
                        {
                            Implicit = new OpenApiOAuthFlow
                            {
                                AuthorizationUrl = new Uri($"{settings.Authority}/connect/authorize"),
                                TokenUrl = new Uri($"{settings.Authority}/connect/token"),

                                Scopes = new Dictionary<string, string>
                                {
                                    {settings.ApiName , settings.ApiName },
                                    {"openid" , "openid" },
                                    {"profile", "profile" },
                                    {"offline_access", "offline_access" },
                                    {"role", "role" },
                                    {"sso", "sso" }
                                }
                            }
                        }
                    });

                    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer",
                                },
                                Scheme = "oauth2",
                                Name = "Bearer",
                                In = ParameterLocation.Header,

                            },
                            new List<string>(){
                                "token",
                                "id_token"
                            }
                        }
                    });
                }
            });

            return services;
        }

        public static void UseAppSwagger(this IApplicationBuilder app, AppSettings settings)
        {
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", settings.ApiName);
                if (settings.UseAuthority)
                {
                    c.OAuthAppName(settings.ApiName);
                    c.OAuthClientId(settings.ClientId);
                    c.OAuthRealm(settings.Authority);
                    c.OAuthAdditionalQueryStringParams(new Dictionary<string, string> { { "nonce", Guid.NewGuid().ToString() } });
                }
            });
        }

    }
}
