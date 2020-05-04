using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Borderless.BusinessLayer;
using Borderless.Model.Entities;

namespace Borderless.ServiceLayer.Controllers
{
    public class VotesController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpGet]
        [Authorize]
        public List<Vote> GetAll()
        {
            return _context.Votes.GetAll();
        }

        [HttpGet]
        [Authorize]
        public Vote GetById(Guid userId, Guid translationId)
        {
            return _context.Votes.GetById(userId, translationId);
        }

        [HttpGet]
        [Authorize]
        public List<Vote> GetAllByTranslationId(Guid translationId)
        {
            return _context.Votes.GetAllByTranslationId(translationId);
        }

        [HttpGet]
        [Authorize]
        public List<Vote> GetAllByUserId(Guid userId)
        {
            return _context.Votes.GetAllByUserId(userId);
        }

        [HttpPost]
        [Authorize]
        public Vote Add([FromBody]Vote vote)
        {
            return _context.Votes.Add(vote);
        }

        [HttpPut]
        [Authorize]
        public Vote UpdateById(Guid userId, Guid translationId, [FromBody]Vote vote)
        {
            return _context.Votes.UpdateById(userId, translationId, vote);
        }

        [HttpDelete]
        [Authorize]
        public void DeleteById(Guid userId, Guid translationId)
        {
            _context.Votes.DeleteById(userId, translationId);
        }
    }
}
