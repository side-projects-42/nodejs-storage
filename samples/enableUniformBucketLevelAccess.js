
//




/**
 * This application demonstrates how to perform basic operations on buckets with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket') {
  // [START storage_enable_uniform_bucket_level_access]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  // Enables uniform bucket-level access for the bucket
  async function enableUniformBucketLevelAccess() {
    await storage.bucket(bucketName).setMetadata({
      iamConfiguration: {
        uniformBucketLevelAccess: {
          enabled: true,
        },
      },
    });

    console.log(`Uniform bucket-level access was enabled for ${bucketName}.`);
  }

  enableUniformBucketLevelAccess().catch(console.error);
  // [END storage_enable_uniform_bucket_level_access]
}

main(...process.argv.slice(2));
