
//




'use strict';

// sample-metadata:
//   title: Storage Remove Bucket Cors Configuration.
//   description: Removes bucket cors configuration.
//   usage: node removeBucketCors.js <BUCKET_NAME>

function main(bucketName = 'my-bucket') {
  // [START storage_remove_cors_configuration]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function removeBucketCors() {
    await storage.bucket(bucketName).setCorsConfiguration([]);

    console.log(`Removed CORS configuration from bucket ${bucketName}`);
  }

  removeBucketCors().catch(console.error);
  // [END storage_remove_cors_configuration]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
