
//




'use strict';

// sample-metadata:
//   title: Storage Disable Bucket Versioning.
//   description: Disables bucket versioning.
//   usage: node disableBucketVersioning.js <BUCKET_NAME>

function main(bucketName = 'my-bucket') {
  // [START storage_disable_versioning]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function disableBucketVersioning() {
    await storage.bucket(bucketName).setMetadata({
      versioning: {
        enabled: false,
      },
    });

    console.log(`Versioning is disabled for bucket ${bucketName}`);
  }

  disableBucketVersioning().catch(console.error);
  // [END storage_disable_versioning]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
