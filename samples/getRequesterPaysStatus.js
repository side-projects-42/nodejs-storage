
//




/**
 * This application demonstrates how to perform basic operations on buckets with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket') {
  // [START storage_get_requester_pays_status]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function getRequesterPaysStatus() {
    // Gets the requester-pays status of a bucket
    const [metadata] = await storage.bucket(bucketName).getMetadata();

    let status;
    if (metadata && metadata.billing && metadata.billing.requesterPays) {
      status = 'enabled';
    } else {
      status = 'disabled';
    }
    console.log(
      `Requester-pays requests are ${status} for bucket ${bucketName}.`
    );
  }

  getRequesterPaysStatus().catch(console.error);
  // [END storage_get_requester_pays_status]
}
main(...process.argv.slice(2));
