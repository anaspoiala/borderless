using System.Linq;
using System.Security.Cryptography;

namespace Borderless.BusinessLayer.Security
{
    internal class Hasher
    {
        private const int SALT_SIZE = 24; // size in bytes
        private const int HASH_SIZE = 24; // size in bytes
        private const int ITERATIONS = 100000; // number of pbkdf2 iterations

        public static void CreateHash(string input, out byte[] hash, out byte[] salt)
        {
            // Generate a salt
            using (var provider = new RNGCryptoServiceProvider())
            {
                salt = new byte[SALT_SIZE];
                provider.GetBytes(salt);
            }

            // Generate the hash
            using (var pbkdf2 = new Rfc2898DeriveBytes(input, salt, ITERATIONS))
            {
                hash = pbkdf2.GetBytes(HASH_SIZE);
            }
        }

        public static bool CheckHash(string input, byte[] hash, byte[] salt)
        {
            byte[] inputHash; 

            // Hash the input using the existing salt of the hash
            using (var pbkdf2 = new Rfc2898DeriveBytes(input, salt, ITERATIONS))
            {
                inputHash = pbkdf2.GetBytes(HASH_SIZE);
            }

            // Compare the two hashes
            bool hashesAreEqual = inputHash
                .Zip(hash, (ih, h) => ih == h)
                .Aggregate((a, b) => a && b);

            return hashesAreEqual;
        }
    }
}
