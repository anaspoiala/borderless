using System;
using System.Collections.Generic;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;

namespace Borderless.BusinessLayer
{
    public class VoteBL
    {
        private VotesDAL _votesDAL;


        public VoteBL(VotesDAL votesDAL)
        {
            _votesDAL = votesDAL;
        }


        public List<Vote> ReadAll()
        {
            return _votesDAL.ReadAll();
        }

        public Vote ReadById(Guid userId, Guid translationId)
        {
            return _votesDAL.ReadById(userId, translationId);
        }

        public List<Vote> ReadByTranslationId(Guid translationId)
        {
            return _votesDAL.ReadByTranslationId(translationId);
        }

        public List<Vote> ReadByUserId(Guid userId)
        {
            return _votesDAL.ReadByUserId(userId);
        }

        public Vote Add(Vote vote)
        {
            return _votesDAL.Add(vote);
        }

        public Vote UpdateById(Guid userId, Guid translationId, Vote vote)
        {
            return _votesDAL.UpdateById(userId, translationId, vote);
        }

        public void DeleteById(Guid userId, Guid translationId)
        {
            _votesDAL.DeleteById(userId, translationId);
        }
    }
}
