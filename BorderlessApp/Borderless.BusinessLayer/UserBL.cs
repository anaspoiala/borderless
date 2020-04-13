using System;
using System.Collections.Generic;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;

namespace Borderless.BusinessLayer
{
    public class UserBL
    {
        private UsersDAL _usersDAL;


        public UserBL(UsersDAL usersDAL)
        {
            _usersDAL = usersDAL;
        }


        public List<User> GetAll()
        {
            return _usersDAL.ReadAll();
        }

        public User GetById(Guid id)
        {
            return _usersDAL.ReadById(id);
        }

        public User Add(User user)
        {
            return _usersDAL.Add(user);
        }

        public User UpdateById(Guid id, User user)
        {
            return _usersDAL.UpdateById(id, user);
        }

        public void DeleteById(Guid id)
        {
            _usersDAL.DeleteById(id);
        }
    }
}
