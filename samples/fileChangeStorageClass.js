
//




'use strict';

// sample-metadata:
//   title: Change File's Storage Class.
//   description: Change File's Storage Class.
//   usage: node fileChangeStorageClass.js <BUCKET_NAME> <FILE_NAME> <CLASS_NAME>

function main(
  bucketName = 'my-bucket',
  fileName = 'file.txt',
  storageClass = 'standard'
) {
  // [START storage_change_file_storage_class]
  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The ID of your GCS file
  // const fileName = 'your-file-name';

  // The name of a storage class
  // See the StorageClass documentation for other valid storage classes:
  // https://googleapis.dev/java/google-cloud-clients/latest/com/google/cloud/storage/StorageClass.html
  // const storageClass = 'coldline';

  async function fileChangeStorageClass() {
    await storage
      .bucket(bucketName)
      .file(fileName)
      .setStorageClass(storageClass);

    console.log(`${fileName} has been set to ${storageClass}`);
  }

  fileChangeStorageClass().catch(console.error);
  // [END storage_change_file_storage_class]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
