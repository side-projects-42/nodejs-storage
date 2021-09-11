
//




/**
 * This application demonstrates how to perform basic operations on files with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(
  srcBucketName = 'my-bucket',
  srcFilename = 'test2.txt',
  destBucketName = 'my-bucket',
  destFileName = 'test3.txt'
) {
  // [START storage_copy_file]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of the bucket the original file is in
  // const srcBucketName = 'your-source-bucket';

  // The ID of the GCS file to copy
  // const srcFilename = 'your-file-name';

  // The ID of the bucket to copy the file to
  // const destBucketName = 'target-file-bucket';

  // The ID of the GCS file to create
  // const destFileName = 'target-file-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function copyFile() {
    // Copies the file to the other bucket
    await storage
      .bucket(srcBucketName)
      .file(srcFilename)
      .copy(storage.bucket(destBucketName).file(destFileName));

    console.log(
      `gs://${srcBucketName}/${srcFilename} copied to gs://${destBucketName}/${destFileName}`
    );
  }

  copyFile().catch(console.error);
  // [END storage_copy_file]
}
main(...process.argv.slice(2));
