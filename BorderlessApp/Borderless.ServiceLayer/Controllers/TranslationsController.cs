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
    public class TranslationsController : ApiController
    {
        private BLContext _context = new BLContext();

        [HttpGet]
        [Authorize]
        [Route("translations/{id:guid}")]
        public Translation GetById(Guid id)
        {
            return _context.Translations.GetById(id);
        }

        [HttpGet]
        [Authorize]
        [Route("phrases/{id:guid}/translations")]
        public List<Translation> GetAllByPhraseId(Guid phraseId)
        {
            return _context.Translations.GetAllByPhraseId(phraseId);
        }

        [HttpGet]
        [Authorize]
        [Route("phrases/{phraseId:guid}/translations/{languageId:guid}")]
        public List<Translation> GetAllByPhraseIdAndLanguageId(Guid phraseId, Guid languageId)
        {
            return _context.Translations.GetAllByPhraseIdAndLanguageId(phraseId, languageId);
        }

        [HttpGet]
        [Authorize]
        [Route("users/{id:guid}/translations")]
        public List<Translation> GetAllByUserId(Guid id)
        {
            return _context.Translations.GetAllByUserId(id);
        }

        [HttpPost]
        [Authorize]
        [Route("translations")]
        public Translation Add([FromBody]Translation translation)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            return _context.Translations.Add(translation, authenticatedUserId);
        }

        [HttpPut]
        [Authorize]
        [Route("translations/{id:guid}")]
        public Translation UpdateById(Guid id, [FromBody]Translation translation)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            return _context.Translations.UpdateById(id, translation, authenticatedUserId);
        }

        [HttpDelete]
        [Authorize]
        [Route("translations/{id:guid}")]
        public void DeleteById(Guid id)
        {
            Guid authenticatedUserId = ClaimsHelper.GetUserIdFromClaims();
            _context.Translations.DeleteById(id, authenticatedUserId);
        }
    }
}
