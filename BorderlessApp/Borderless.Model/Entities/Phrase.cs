using System;

namespace Borderless.Model.Entities
{
    public class Phrase
    {
        public Guid ID { get; set; }
        public Guid ProjectID { get; set; }
        public string Text { get; set; }

        public Phrase(Guid id, Guid projectID, string text)
        {
            ID = id;
            ProjectID = projectID;
            Text = text;
        }
    }
}
