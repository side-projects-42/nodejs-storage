
//




/**
 * This application demonstrates how to perform basic operations on buckets with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket') {
  // [START storage_get_uniform_bucket_level_access]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function getUniformBucketLevelAccess() {
    // Gets Bucket Metadata and checks if uniform bucket-level access is enabled.
    const [metadata] = await storage.bucket(bucketName).getMetadata();

    if (metadata.iamConfiguration) {
      const uniformBucketLevelAccess =
        metadata.iamConfiguration.uniformBucketLevelAccess;
      console.log(`Uniform bucket-level access is enabled for ${bucketName}.`);
      console.log(
        `Bucket will be locked on ${uniformBucketLevelAccess.lockedTime}.`
      );
    } else {
      console.log(
        `Uniform bucket-level access is not enabled for ${bucketName}.`
      );
    }
  }

  getUniformBucketLevelAccess().catch(console.error);

  // [END storage_get_uniform_bucket_level_access]
}

main(...process.argv.slice(2));
