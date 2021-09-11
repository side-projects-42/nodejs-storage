
//




/**
 * This application demonstrates how to perform basic operations on files with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(
  bucketName = 'my-bucket',
  filePath = 'test.txt',
  kmsKeyName = process.env.GOOGLE_CLOUD_KMS_KEY_US
) {
  // [START storage_upload_with_kms_key]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The path to your file to upload
  // const filePath = 'path/to/your/file';

  // The name of the KMS-key
  // const kmsKeyName = 'my-key';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function uploadFileWithKmsKey() {
    await storage.bucket(bucketName).upload(filePath, {
      kmsKeyName,
    });

    console.log(`${filePath} uploaded to ${bucketName} using ${kmsKeyName}.`);
  }

  uploadFileWithKmsKey().catch(console.error);
  // [END storage_upload_with_kms_key]
}
main(...process.argv.slice(2));
