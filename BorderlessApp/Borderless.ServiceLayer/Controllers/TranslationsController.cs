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
    public class TranslationsController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpGet]
        public List<Translation> GetAll()
        {
            return _context.Translations.GetAll();
        }

        [HttpGet]
        public Translation GetById(Guid id)
        {
            return _context.Translations.GetById(id);
        }

        [HttpGet]
        public List<Translation> GetAllByPhraseId(Guid phraseId)
        {
            return _context.Translations.GetAllByPhraseId(phraseId);
        }

        [HttpGet]
        public List<Translation> GetAllByPhraseIdAndLanguageId(Guid phraseId, Guid languageId)
        {
            return _context.Translations.GetAllByPhraseIdAndLanguageId(phraseId, languageId);
        }

        [HttpGet]
        public List<Translation> GetAllByUserId(Guid userId)
        {
            return _context.Translations.GetAllByUserId(userId);
        }

        [HttpPost]
        public Translation Add([FromBody]Translation translation)
        {
            return _context.Translations.Add(translation);
        }

        [HttpPut]
        public Translation UpdateById(Guid id, [FromBody]Translation translation)
        {
            return _context.Translations.UpdateById(id, translation);
        }

        [HttpDelete]
        public void DeleteById(Guid projectId)
        {
            _context.Translations.DeleteById(projectId);
        }
    }
}
