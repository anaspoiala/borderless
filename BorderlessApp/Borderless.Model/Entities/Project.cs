using System;
using System.Collections.Generic;

namespace Borderless.Model.Entities
{
    public class Project
    {
        public Guid ID { get; set; }
        public Guid UserID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Language SourceLanguage { get; set; }
        public List<Language> TargetLanguages { get; set; }

        public Project(Guid id,
            Guid userID,
            string name,
            string description,
            Language sourceLanguage,
            List<Language> targetLanguages)
        {
            ID = id;
            UserID = userID;
            Name = name;
            Description = description;
            SourceLanguage = sourceLanguage;
            TargetLanguages = targetLanguages;
        }
    }
}
