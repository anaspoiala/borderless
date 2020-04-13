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
        public List<Vote> GetAll()
        {
            return _context.Votes.GetAll();
        }

        [HttpGet]
        public Vote GetById(Guid userId, Guid translationId)
        {
            return _context.Votes.GetById(userId, translationId);
        }

        [HttpGet]
        public List<Vote> GetAllByTranslationId(Guid translationId)
        {
            return _context.Votes.GetAllByTranslationId(translationId);
        }

        [HttpGet]
        public List<Vote> GetAllByUserId(Guid userId)
        {
            return _context.Votes.GetAllByUserId(userId);
        }

        [HttpPost]
        public Vote Add([FromBody]Vote vote)
        {
            return _context.Votes.Add(vote);
        }

        [HttpPut]
        public Vote UpdateById(Guid userId, Guid translationId, [FromBody]Vote vote)
        {
            return _context.Votes.UpdateById(userId, translationId, vote);
        }

        [HttpDelete]
        public void DeleteById(Guid userId, Guid translationId)
        {
            _context.Votes.DeleteById(userId, translationId);
        }
    }
}
