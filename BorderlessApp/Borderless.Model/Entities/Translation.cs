using System;
using System.Collections.Generic;

namespace Borderless.Model.Entities
{
    public class Translation
    {
        public Guid ID { get; set; }
        public string Text { get; set; }
        public Language Language { get; set; }
        public User User { get; set; }
        public List<Vote> Votes { get; set; }

        public Translation(Guid id, string text, Language language, User user, List<Vote> votes)
        {
            ID = id;
            Text = text;
            Language = language;
            User = user;
            Votes = votes;  
        }
    }
}
