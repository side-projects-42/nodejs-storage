// Copyright 2021 Google LLC
//




'use strict';

// sample-metadata:
//   title: Remove Default KMS Key.
//   description: Remove Default KMS Key.
//   usage: node removeDefaultKMSKey.js <BUCKET_NAME>

function main(bucketName = 'my-bucket') {
  // [START storage_bucket_delete_default_kms_key]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function removeDefaultKMSKey() {
    await storage.bucket(bucketName).setMetadata({
      encryption: {
        defaultKmsKeyName: null,
      },
    });

    console.log(`Default KMS key was removed from ${bucketName}`);
  }

  removeDefaultKMSKey().catch(console.error);
  // [END storage_bucket_delete_default_kms_key]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
