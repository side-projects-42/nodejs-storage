// Copyright 2021 Google LLC
//




/**
 * This application demonstrates how to perform basic operations on buckets with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket') {
  // [START storage_get_public_access_prevention]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The name of your GCS bucket
  // const bucketName = 'Name of a bucket, e.g. my-bucket';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function getPublicAccessPrevention() {
    // Gets Bucket Metadata and prints publicAccessPrevention value (either 'unspecified' or 'enforced').
    const [metadata] = await storage.bucket(bucketName).getMetadata();
    console.log(
      `Public access prevention is ${metadata.iamConfiguration.publicAccessPrevention} for ${bucketName}.`
    );
  }

  getPublicAccessPrevention();

  // [END storage_get_public_access_prevention]
}

main(...process.argv.slice(2));
