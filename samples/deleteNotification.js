
//




/**
 * This application demonstrates how to perform basic operations on files with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket', notificationId = '1') {
  // [START storage_delete_bucket_notification]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The ID of the notification
  // const notificationId = '1';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function deleteNotification() {
    // Deletes the notification from the bucket
    await storage.bucket(bucketName).notification(notificationId).delete();

    console.log(`Notification ${notificationId} deleted.`);
  }

  deleteNotification().catch(console.error);
  // [END storage_delete_bucket_notification]
}
main(...process.argv.slice(2));
