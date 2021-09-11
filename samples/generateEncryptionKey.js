
//




/**
 * This application demonstrates how to perform basic operations on encrypted
 * files with the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main() {
  // [START storage_generate_encryption_key]
  const crypto = require('crypto');

  function generateEncryptionKey() {
    /**
     * Generates a 256 bit (32 byte) AES encryption key and prints the base64
     * representation.
     *
     * This is included for demonstration purposes. You should generate your own
     * key. Please remember that encryption keys should be handled with a
     * comprehensive security policy.
     */
    const buffer = crypto.randomBytes(32);
    const encodedKey = buffer.toString('base64');
    console.log(`Base 64 encoded encryption key: ${encodedKey}`);
  }
  generateEncryptionKey();
  // [END storage_generate_encryption_key]
}
main(...process.argv.slice(2));
