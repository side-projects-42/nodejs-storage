
//




/**
 * This application demonstrates how to disable Object Lifecycle Management for
 * a bucket.
 *
 * For more information, see the documentation at https://cloud.google.com/storage/docs/lifecycle.
 */

function main(bucketName = 'my-bucket') {
  // [START storage_disable_bucket_lifecycle_management]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function disableBucketLifecycleManagement() {
    await storage.bucket(bucketName).setMetadata({lifecycle: null});

    console.log(`Lifecycle management is disabled for bucket ${bucketName}`);
  }

  disableBucketLifecycleManagement().catch(console.error);
  // [END storage_disable_bucket_lifecycle_management]
}

main(...process.argv.slice(2));
