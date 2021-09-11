
//




/**
 * This application demonstrates how to use Bucket Lock operations on buckets
 * and objects using the Google Cloud Storage API.
 *
 * For more information read the documentation
 * at https://cloud.google.com/storage/docs/bucket-lock
 */

function main(bucketName = 'my-bucket', retentionPeriod = 5) {
  // [START storage_set_retention_policy]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The retention period for objects in bucket
  // const retentionPeriod = 3600; // 1 hour in seconds

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function setRetentionPolicy() {
    const [metadata] = await storage
      .bucket(bucketName)
      .setRetentionPeriod(retentionPeriod);
    console.log(
      `Bucket ${bucketName} retention period set for ${metadata.retentionPolicy.retentionPeriod} seconds.`
    );
  }

  setRetentionPolicy().catch(console.error);
  // [END storage_set_retention_policy]
}
main(...process.argv.slice(2));
