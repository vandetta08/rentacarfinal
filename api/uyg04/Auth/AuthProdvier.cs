using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.Owin.Security;
using System.Web.Http;

namespace uyg04.Auth
{
    [Authorize]
    public class AuthProvider : OAuthAuthorizationServerProvider
    {

        public override async Task ValidateClientAuthentication
            (OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }
        public override async Task GrantResourceOwnerCredentials
            (OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Conrol-Allow-Origin", new[] { "*" }); //farklı domainlerde istek sorunu yaşamamak için

            //burada kendi authentication yönteminizi belirleyebiliriz. Veritabanı bağlantısı vs...
            if (context.UserName == "akd" && context.Password == "123")
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                identity.AddClaim(new Claim("name", context.UserName));
                identity.AddClaim(new Claim("yetki", "Admin"));

                context.Validated(identity);
            }
            else
            {
                context.SetError("Geçersiz istek", "Hatalı Kullanıcı Bilgisi");
            }
        }
    }
}