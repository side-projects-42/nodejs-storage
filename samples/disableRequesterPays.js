
//




/**
 * This application demonstrates how to perform basic operations on buckets with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket') {
  // [START storage_disable_requester_pays]

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function disableRequesterPays() {
    // Disables requester-pays requests
    await storage.bucket(bucketName).disableRequesterPays();

    console.log(
      `Requester-pays requests have been disabled for bucket ${bucketName}`
    );
  }

  disableRequesterPays().catch(console.error);
  // [END storage_disable_requester_pays]
}
main(...process.argv.slice(2));
