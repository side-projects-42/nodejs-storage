
//




/**
 * This application demonstrates how to perform basic operations on files with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */
const uuid = require('uuid');

function main(
  bucketName = 'my-bucket',
  topic = `nodejs-storage-samples-${uuid.v4()}`
) {
  // [START storage_create_bucket_notifications]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The name of a topic
  // const topic = 'my-topic';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function createNotification() {
    // Creates a notification
    await storage.bucket(bucketName).createNotification(topic);

    console.log('Notification subscription created.');
  }

  createNotification().catch(console.error);
  // [END storage_create_bucket_notifications]
}
main(...process.argv.slice(2));
