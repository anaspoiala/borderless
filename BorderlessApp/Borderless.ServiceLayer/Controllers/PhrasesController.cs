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
    public class PhrasesController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpGet]
        public List<Phrase> GetAll()
        {
            return _context.Phrases.GetAll();
        }

        [HttpGet]
        public Phrase GetById(Guid id)
        {
            return _context.Phrases.GetById(id);
        }

        [HttpGet]
        public List<Phrase> GetAllByProjectId(Guid projectId)
        {
            return _context.Phrases.GetAllByProjectId(projectId);
        }

        [HttpPost]
        public Phrase Add([FromBody]Phrase phrase)
        {
            return _context.Phrases.Add(phrase);
        }

        [HttpPut]
        public Phrase UpdateById(Guid id, [FromBody]Phrase phrase)
        {
            return _context.Phrases.UpdateById(id, phrase);
        }

        [HttpDelete]
        public void DeleteById(Guid id)
        {
            _context.Phrases.DeleteById(id);
        }
    }
}
