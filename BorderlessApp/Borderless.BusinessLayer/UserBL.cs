using System;
using System.Linq;
using System.Collections.Generic;
using Borderless.BusinessLayer.Entities;
using Borderless.BusinessLayer.Security;
using Borderless.DataAccessLayer;
using Borderless.Model.Entities;

namespace Borderless.BusinessLayer
{
    public class UserBL
    {
        private UsersDAL _usersDAL;
        private const string SEPARATOR = "##";

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

        public User GetByUsername(string username)
        {
            return _usersDAL.ReadByUsername(username);
        }

        public User Register(RegistrationDetails registrationDetails)
        {
            if (_usersDAL.ReadByUsername(registrationDetails.Username) != null)
                throw new Exception("An user with the same username already exists!");

            string passwordHash = GetPasswordHash(registrationDetails.Password);
            var user = new User(
                id: Guid.Empty,
                username: registrationDetails.Username,
                passwordHash: passwordHash,
                firstName: registrationDetails.FirstName,
                lastName: registrationDetails.LastName,
                email: registrationDetails.Email
            );

            return _usersDAL.Add(user);
        }

        public User UpdateById(Guid id, UserUpdateDetails updateDetails)
        {
            var user = _usersDAL.ReadById(id);

            if (user == null)
                throw new Exception("Cannot update inexistent user!");

            user.PasswordHash = GetPasswordHash(updateDetails.Password);
            user.FirstName = updateDetails.FirstName;
            user.LastName = updateDetails.LastName;
            user.Email = updateDetails.Email;

            return _usersDAL.UpdateById(id, user);
        }

        public User UpdatePasswordById(Guid id, string newPassword)
        {
            var user = _usersDAL.ReadById(id);

            if (user == null)
                throw new Exception("Cannot update inexistent user!");

            user.PasswordHash = GetPasswordHash(newPassword);

            return _usersDAL.UpdateById(id, user);
        }

        public void DeleteById(Guid id)
        {
            _usersDAL.DeleteById(id);
        }

        public bool CheckCredentials(LoginCredentials credentials)
        {
            var user = _usersDAL.ReadByUsername(credentials.Username);

            if (user != null)
            {
                string[] hashAndSalt = user.PasswordHash
                        .Split(new[] { SEPARATOR }, StringSplitOptions.None);
                byte[] hash = Convert.FromBase64String(hashAndSalt[0]);
                byte[] salt = Convert.FromBase64String(hashAndSalt[1]);

                return Hasher.CheckHash(credentials.Password, hash, salt);
            }

            return false;
        }

        private string GetPasswordHash(string password)
        {
            Hasher.CreateHash(password, out byte[] hash, out byte[] salt);

            return $"{Convert.ToBase64String(hash)}{SEPARATOR}{Convert.ToBase64String(salt)}";
        }
    }
}
