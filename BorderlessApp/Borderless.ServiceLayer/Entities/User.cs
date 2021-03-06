﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Borderless.ServiceLayer.Entities
{
    public class User
    {
        public Guid ID { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}