
//




'use strict';

// sample-metadata:
//   title: Storage Get Bucket Metadata.
//   description: Get bucket metadata.
//   usage: node bucketMetadata.js <BUCKET_NAME>

function main(bucketName = 'my-bucket') {
  // [START storage_get_bucket_metadata]
  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function getBucketMetadata() {
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // The ID of your GCS bucket
    // const bucketName = 'your-unique-bucket-name';

    // Get Bucket Metadata
    const [metadata] = await storage.bucket(bucketName).getMetadata();

    for (const [key, value] of Object.entries(metadata)) {
      console.log(`${key}: ${value}`);
    }
  }
  // [END storage_get_bucket_metadata]
  getBucketMetadata().catch(console.error);
}

main(...process.argv.slice(2));
