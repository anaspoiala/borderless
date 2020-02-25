using System;

namespace Borderless.Model.Entities
{
    public class Vote
    {
        public User User { get; set; }
        public bool IsUpvote { get; set; }

        public Vote(User user, bool isUpvote)
        {
            User = user;
            IsUpvote = isUpvote;    
        }
    }
}
