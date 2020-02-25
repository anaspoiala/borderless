using System;
using System.Collections.Generic;

namespace Borderless.Model.Entities
{
    public class User
    {
        public Guid ID { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public List<Project> Projects { get; set; }
    }
}
