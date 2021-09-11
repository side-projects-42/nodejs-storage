
//




/**
 * This application demonstrates how to use Bucket Lock operations on buckets
 * and objects using the Google Cloud Storage API.
 *
 * For more information read the documentation
 * at https://cloud.google.com/storage/docs/bucket-lock
 */

function main(bucketName = 'my-bucket') {
  // [START storage_enable_default_event_based_hold]

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function enableDefaultEventBasedHold() {
    // Enables a default event-based hold for the bucket.
    await storage.bucket(bucketName).setMetadata({
      defaultEventBasedHold: true,
    });

    console.log(`Default event-based hold was enabled for ${bucketName}.`);
  }

  enableDefaultEventBasedHold().catch(console.error);
  // [END storage_enable_default_event_based_hold]
}
main(...process.argv.slice(2));
