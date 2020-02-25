using System;

namespace Borderless.Model.Entities
{
    public class Language
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Abbreviation { get; set; }

        public Language(Guid id, string name, string abbreviation)
        {
            ID = id;
            Name = name;
            Abbreviation = abbreviation;
        }
    }
}
