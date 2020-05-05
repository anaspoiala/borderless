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


        public List<Vote> GetAll()
        {
            return _votesDAL.ReadAll();
        }

        public Vote GetById(Guid userId, Guid translationId)
        {
            return _votesDAL.ReadById(userId, translationId);
        }

        public List<Vote> GetAllByTranslationId(Guid translationId)
        {
            return _votesDAL.ReadAllByTranslationId(translationId);
        }

        public List<Vote> GetAllByUserId(Guid userId)
        {
            return _votesDAL.ReadAllByUserId(userId);
        }

        public Vote Add(Vote vote, Guid authenticatedUserId)
        {
            ValidateAuthenticatedUserIsVoteAuthor(vote.UserID, authenticatedUserId);
            return _votesDAL.Add(vote);
        }

        public Vote UpdateById(Guid userId, Guid translationId, Vote vote, Guid authenticatedUserId)
        {
            ValidateAuthenticatedUserIsVoteAuthor(userId, authenticatedUserId);
            return _votesDAL.UpdateById(userId, translationId, vote);
        }

        public void DeleteById(Guid userId, Guid translationId, Guid authenticatedUserId)
        {
            ValidateAuthenticatedUserIsVoteAuthor(userId, authenticatedUserId);
            _votesDAL.DeleteById(userId, translationId);
        }

        private void ValidateAuthenticatedUserIsVoteAuthor(Guid userId, Guid authenticatedUserId)
        {
            if (authenticatedUserId != userId)
            {
                throw new ArgumentException();
            }
        }
    }
}
