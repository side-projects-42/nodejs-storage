// Copyright 2021 Google LLC
//




'use strict';

// sample-metadata:
//   title: Storage Make Bucket Public.
//   description: Storage Make Bucket Public.
//   usage: node makeBucketPublic.js <BUCKET_NAME>

function main(bucketName = 'my-bucket') {
  // [START storage_set_bucket_public_iam]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function makeBucketPublic() {
    await storage.bucket(bucketName).makePublic();

    console.log(`Bucket ${bucketName} is now publicly readable`);
  }

  makeBucketPublic().catch(console.error);
  // [END storage_set_bucket_public_iam]
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
