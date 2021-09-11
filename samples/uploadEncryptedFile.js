
//



const path = require('path');

function main(
  bucketName = 'my-bucket',
  filePath = path.join(__dirname, '../resources', 'test.txt'),
  destFileName = 'test.txt',
  key = process.env.GOOGLE_CLOUD_KMS_KEY_US
) {
  // [START storage_upload_encrypted_file]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The path to your file to upload
  // const filePath = 'path/to/your/file';

  // The new ID for your GCS file
  // const destFileName = 'your-new-file-name';

  // The key to encrypt the object with
  // const key = 'TIbv/fjexq+VmtXzAlc63J4z5kFmWJ6NdAPQulQBT7g=';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function uploadEncryptedFile() {
    const options = {
      destination: destFileName,
      encryptionKey: Buffer.from(key, 'base64'),
    };

    await storage.bucket(bucketName).upload(filePath, options);

    console.log(
      `File ${filePath} uploaded to gs://${bucketName}/${destFileName}`
    );
  }

  uploadEncryptedFile().catch(console.error);
  // [END storage_upload_encrypted_file]
}
main(...process.argv.slice(2));
