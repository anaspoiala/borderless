using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;

namespace Borderless.ServiceLayer.Helpers
{
    public static class ClaimsHelper
    {
        public static Guid GetUserIdFromClaims()
        {
            // Get the current claims principal from the thread
            var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;

            // Get the user id from the claims
            Guid userId = Guid.Parse(
                identity.Claims
                    .Where(claim => claim.Type == ClaimTypes.NameIdentifier)
                    .Select(claim => claim.Value)
                    .Single()
            );

            if (userId == Guid.Empty)
                throw new ArgumentException();

            return userId;
        }
    }
}