
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
  srcFileName = 'test2.txt',
  destFileName = 'test4.txt'
) {
  // [START storage_rename_file]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of the bucket the original file is in
  // const srcBucketName = 'your-source-bucket';

  // The ID of the GCS file to rename
  // const srcFilename = 'your-file-name';

  // The new ID of the GCS file
  // const destFileName = 'target-file-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function renameFile() {
    // renames the file
    await storage.bucket(srcBucketName).file(srcFileName).rename(destFileName);

    console.log(
      `gs://${srcBucketName}/${srcFileName} renamed to gs://${srcBucketName}/${destFileName}.`
    );
  }

  renameFile().catch(console.error);
  // [END storage_rename_file]
}
main(...process.argv.slice(2));
