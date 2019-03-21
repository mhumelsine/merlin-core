using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Merlin.Web
{
    public class MerlinUrlHelpers
    {

        public static string Decrypt(string input)
        {
            if (string.IsNullOrEmpty(input))
                return "";
            input = WebUtility.UrlDecode(input);

            try
            {
                byte[] key = Encoding.UTF8.GetBytes("&%#@?,:*");
                byte[] iv = new byte[] { 0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF };
                byte[] inputbytes = Convert.FromBase64String(input);

                DESCryptoServiceProvider crypto = new DESCryptoServiceProvider();
                MemoryStream mstream = new MemoryStream();
                CryptoStream cstream = new CryptoStream(mstream, crypto.CreateDecryptor(key, iv), CryptoStreamMode.Write);
                cstream.Write(inputbytes, 0, inputbytes.Length);

                cstream.FlushFinalBlock();

                return Encoding.UTF8.GetString(mstream.ToArray());
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public static string Encrypt(string input)
        {
            if (string.IsNullOrEmpty(input))
                return "";
            byte[] key = Encoding.UTF8.GetBytes("&%#@?,:*");
            byte[] iv = new byte[] { 0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF };

            try
            {
                DESCryptoServiceProvider crypto = new DESCryptoServiceProvider();
                byte[] bytes = Encoding.UTF8.GetBytes(input);
                MemoryStream memoryStream = new MemoryStream();
                CryptoStream cryptoStream = new CryptoStream(memoryStream, crypto.CreateEncryptor(key, iv), CryptoStreamMode.Write);
                cryptoStream.Write(bytes, 0, bytes.Length);

                cryptoStream.FlushFinalBlock();

                return WebUtility.UrlEncode(Convert.ToBase64String(memoryStream.ToArray()));
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
