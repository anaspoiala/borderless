using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using Borderless.BusinessLayer;
using Borderless.Model.Entities;
using Borderless.ServiceLayer.Helpers;

namespace Borderless.ServiceLayer.Controllers
{
    [RoutePrefix("api")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class VotesController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpGet]
        [Authorize]
        [Route("votes")]
        public List<Vote> GetById(Guid? userId, Guid? translationId)
        {
            if (userId.HasValue && translationId.HasValue)
            {
                // /votes?userId=...&translationId=...
                return new List<Vote> { _context.Votes.GetById(userId.Value, translationId.Value) };
            }
            else if (!userId.HasValue && translationId.HasValue)
            {
                // /votes?translationId=...
                return _context.Votes.GetAllByTranslationId(translationId.Value);
            }
            else if (userId.HasValue && !translationId.HasValue)
            {
                // /votes?translationId=...
                return _context.Votes.GetAllByUserId(userId.Value);
            }
            else
            {
                throw new Exception("Cannot get all votes. Must specify at least one parameter.");
            }
        }

        [HttpGet]
        [Authorize]
        [Route("votes/{translationId:guid}")]
        public Vote GetCurrentUserVoteByTranslationId(Guid translationId)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            return _context.Votes.GetById(authenticatedUserId, translationId);
        }

        [HttpPost]
        [Authorize]
        [Route("votes")]
        public Vote Add([FromBody]Vote vote)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            return _context.Votes.Add(vote, authenticatedUserId);
        }

        [HttpPut]
        [Authorize]
        [Route("votes/{translationId:guid}")]
        public Vote UpdateById(Guid translationId, [FromBody]Vote vote)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            return _context.Votes.UpdateById(translationId, vote, authenticatedUserId);
        }

        [HttpDelete]
        [Authorize]
        [Route("votes/{translationId:guid}")]
        public void DeleteById(Guid translationId)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            _context.Votes.DeleteById(translationId, authenticatedUserId);
        }
    }
}
