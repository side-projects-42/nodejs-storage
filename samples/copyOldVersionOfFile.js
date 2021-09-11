
//




'use strict';

// sample-metadata:
//   title: Copy Old Version Of File.
//   description: Copy Old Version Of File.
//   usage: node copyOldVersionOfFile.js <SRC_BUCKET_NAME> <SRC_FILE_NAME> <DEST_BUCKET_NAME> <DEST_FILE_NAME> <GENERATION>

function main(
  srcBucketName = 'my-bucket',
  srcFilename = 'test2.txt',
  destBucketName = 'my-bucket',
  destFileName = 'test3.txt',
  generation = 1
) {
  // [START storage_copy_file_archived_generation]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const srcBucketName = "your-unique-bucket-name";

  // The ID of the GCS file to copy an old version of
  // const srcFilename = "your-file-name";

  // The generation of fileToCopy to copy
  // const generation = 1579287380533984;

  // The ID of the bucket to copy the file to
  // const destBucketName = 'target-file-bucket';

  // What to name the new file with the old data from srcFilename
  // const destFileName = "your-new-file";

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function copyOldVersionOfFile() {
    // Copies the file to the other bucket
    await storage
      .bucket(srcBucketName)
      .file(srcFilename, {
        generation,
      })
      .copy(storage.bucket(destBucketName).file(destFileName));

    console.log(
      `Generation ${generation} of file ${srcFilename} in bucket ${srcBucketName} was copied to ${destFileName} in bucket ${destBucketName}`
    );
  }

  copyOldVersionOfFile().catch(console.error);
  // [END storage_copy_file_archived_generation]
}
main(...process.argv.slice(2));
