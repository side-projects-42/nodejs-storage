
//




/**
 * This application demonstrates how to enable Object Lifecycle Management for
 * a bucket.
 *
 * For more information, see the documentation at https://cloud.google.com/storage/docs/lifecycle.
 */

function main(bucketName = 'my-bucket') {
  // [START storage_enable_bucket_lifecycle_management]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function enableBucketLifecycleManagement() {
    const [metadata] = await storage.bucket(bucketName).addLifecycleRule({
      action: 'delete',
      condition: {age: 100},
    });

    console.log(
      `Lifecycle management is enabled for bucket ${bucketName} and the rules are:`
    );

    console.log(metadata.lifecycle.rule);
  }

  enableBucketLifecycleManagement().catch(console.error);
  // [END storage_enable_bucket_lifecycle_management]
}

main(...process.argv.slice(2));
