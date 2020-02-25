using System;

namespace Borderless.Model.Entities
{
    public class Vote
    {
        public User User { get; set; }
        public bool IsUpvote { get; set; }
    }
}
