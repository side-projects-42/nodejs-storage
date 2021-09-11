
//




/**
 * This application demonstrates how to perform basic operations on encrypted
 * files with the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(
  bucketName = 'my-bucket',
  fileName = 'test.txt',
  oldKey = process.env.GOOGLE_CLOUD_KMS_KEY_US,
  newKey = process.env.GOOGLE_CLOUD_KMS_KEY_ASIA
) {
  // [START storage_rotate_encryption_key]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The ID of your GCS file
  // const fileName = 'your-file-name';

  // The Base64 encoded AES-256 encryption key originally used to encrypt the
  // object. See the documentation on Customer-Supplied Encryption keys for
  // more info:
  // https://cloud.google.com/storage/docs/encryption/using-customer-supplied-keys
  // The Base64 encoded AES-256 encryption key originally used to encrypt the
  // const oldKey = 'TIbv/fjexq+VmtXzAlc63J4z5kFmWJ6NdAPQulQBT7g=';

  // The new encryption key to use
  // const newKey = '0mMWhFvQOdS4AmxRpo8SJxXn5MjFhbz7DkKBUdUIef8=';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function rotateEncryptionKey() {
    await storage
      .bucket(bucketName)
      .file(fileName, {
        encryptionKey: Buffer.from(oldKey, 'base64'),
      })
      .rotateEncryptionKey({
        encryptionKey: Buffer.from(newKey, 'base64'),
      });

    console.log('Encryption key rotated successfully');
  }

  rotateEncryptionKey().catch(console.error);
  // [END storage_rotate_encryption_key]
}
main(...process.argv.slice(2));
