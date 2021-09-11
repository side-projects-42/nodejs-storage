
//




'use strict';

// sample-metadata:
//   title: Change Bucket's Default Storage Class.
//   description: Change Bucket's Default Storage Class.
//   usage: node changeDefaultStorageClass.js <BUCKET_NAME> <CLASS_NAME>

function main(bucketName = 'my-bucket', storageClass = 'standard') {
  // [START storage_change_default_storage_class]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The name of a storage class
  // See the StorageClass documentation for other valid storage classes:
  // https://googleapis.dev/java/google-cloud-clients/latest/com/google/cloud/storage/StorageClass.html
  // const storageClass = 'coldline';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function changeDefaultStorageClass() {
    await storage.bucket(bucketName).setStorageClass(storageClass);

    console.log(`${bucketName} has been set to ${storageClass}`);
  }

  changeDefaultStorageClass().catch(console.error);
  // [END storage_change_default_storage_class]
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
