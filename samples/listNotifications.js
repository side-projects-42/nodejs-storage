
//




/**
 * This application demonstrates how to perform basic operations on files with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket') {
  // [START storage_list_bucket_notifications]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function listNotifications() {
    // Lists notifications in the bucket
    const [notifications] = await storage.bucket(bucketName).getNotifications();

    console.log('Notifications:');
    notifications.forEach(notification => {
      console.log(notification.id);
    });
  }

  listNotifications().catch(console.error);
  // [END storage_list_bucket_notifications]
}
main(...process.argv.slice(2));
