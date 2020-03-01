using System;

namespace Borderless.Model.Entities
{
    public class Translation
    {
        public Guid ID { get; set; }
        public string Text { get; set; }
        public Guid PhraseID { get; set; }
        public Guid LanguageID { get; set; }
        public Guid UserID { get; set; }

        public Translation(Guid id, string text, Guid phraseID, Guid languageID, Guid userID)
        {
            ID = id;
            Text = text;
            PhraseID = phraseID;
            LanguageID = languageID;
            UserID = userID;
        }
    }
}
