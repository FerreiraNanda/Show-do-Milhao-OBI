using System.Security.Cryptography;
using System.Text;

namespace ShowDoMilhaoOBI.Services
{
    public class EncriptyPassword
    {
        private readonly string _passwordRandom = "çkadmmK@mçfmçf9";

        public string Encrypt(string password)
        {
            var newPassword = $"{password} {_passwordRandom}";

            var bytes = Encoding.UTF8.GetBytes(newPassword);
            var hashBytes = SHA512.HashData(bytes);

            return StringBytes(hashBytes);
        }

        private static string StringBytes(byte[] bytes)
        {
            var sb = new StringBuilder();
            foreach (byte b in bytes)
            {
                var hex = b.ToString("x2");
                sb.Append(hex);
            }

            return sb.ToString();
        }
    }
}
