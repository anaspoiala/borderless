using System;
using System.Collections.Generic;

namespace Borderless.Model.Entities
{
    public class Project
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Language SourceLanguage { get; set; }
        public List<Language> TargetLanguages { get; set; }
        public List<Phrase> Phrases { get; set; }

        public Project(Guid id,
            string name,
            string description,
            Language sourceLanguage,
            List<Language> targetLanguages,
            List<Phrase> phrases)
        {
            ID = id;
            Name = name;
            Description = description;
            SourceLanguage = sourceLanguage;
            TargetLanguages = targetLanguages;
            Phrases = phrases;  
        }
    }
}
