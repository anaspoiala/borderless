using System;

namespace Borderless.Model.Entities
{
    public class Vote
    {
        public Guid UserID { get; set; }
        public Guid TranslationID { get; set; }
        public bool IsUpvote { get; set; }

        public Vote(Guid userID, Guid translationID, bool isUpvote)
        {
            UserID = userID;
            TranslationID = translationID;
            IsUpvote = isUpvote;
        }
    }
}
