
//




/**
 * This application demonstrates how to use Bucket Lock operations on buckets
 * and objects using the Google Cloud Storage API.
 *
 * For more information read the documentation
 * at https://cloud.google.com/storage/docs/bucket-lock
 */

function main(bucketName = 'my-bucket') {
  // [START storage_get_retention_policy]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function getRetentionPolicy() {
    const [metadata] = await storage.bucket(bucketName).getMetadata();
    if (metadata.retentionPolicy) {
      const retentionPolicy = metadata.retentionPolicy;
      console.log('A retention policy exists!');
      console.log(`Period: ${retentionPolicy.retentionPeriod}`);
      console.log(`Effective time: ${retentionPolicy.effectiveTime}`);
      if (retentionPolicy.isLocked) {
        console.log('Policy is locked');
      } else {
        console.log('Policy is unlocked');
      }
    }
  }

  getRetentionPolicy().catch(console.error);
  // [END storage_get_retention_policy]
}
main(...process.argv.slice(2));
