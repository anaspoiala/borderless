using System;
using System.Collections.Generic;

namespace Borderless.Model.Entities
{
    public class Phrase
    {
        public Guid ID { get; set; }
        public string Text { get; set; }
        public List<Translation> Translations { get; set; }
    }
}
