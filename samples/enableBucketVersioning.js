
//




'use strict';

// sample-metadata:
//   title: Storage Enable Bucket Versioning.
//   description: Enables bucket versioning.
//   usage: node enableBucketVersioning.js <BUCKET_NAME>

function main(bucketName = 'my-bucket') {
  // [START storage_enable_versioning]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function enableBucketVersioning() {
    await storage.bucket(bucketName).setMetadata({
      versioning: {
        enabled: true,
      },
    });

    console.log(`Versioning is enabled for bucket ${bucketName}`);
  }

  enableBucketVersioning().catch(console.error);
  // [END storage_enable_versioning]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
