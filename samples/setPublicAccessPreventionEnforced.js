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
  // [START storage_set_public_access_prevention_enforced]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The name of your GCS bucket
  // const bucketName = 'Name of a bucket, e.g. my-bucket';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  // Enforces public access prevention for the bucket
  async function setPublicAccessPreventionEnforced() {
    await storage.bucket(bucketName).setMetadata({
      iamConfiguration: {
        publicAccessPrevention: 'enforced',
      },
    });

    console.log(
      `Public access prevention is set to enforced for ${bucketName}.`
    );
  }

  setPublicAccessPreventionEnforced();
  // [END storage_set_public_access_prevention_enforced]
}

main(...process.argv.slice(2));
