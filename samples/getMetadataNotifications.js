
//




/**
 * This application demonstrates how to perform basic operations on files with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket', notificationId = '1') {
  // [START storage_print_pubsub_bucket_notification]
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

  async function getMetadata() {
    // Get the notification metadata
    const [metadata] = await storage
      .bucket(bucketName)
      .notification(notificationId)
      .getMetadata();

    console.log(`ID: ${metadata.id}`);
    console.log(`Topic: ${metadata.topic}`);
    console.log(`Event Types: ${metadata.event_types}`);
    console.log(`Custom Attributes: ${metadata.custom_attributes}`);
    console.log(`Payload Format: ${metadata.payload_format}`);
    console.log(`Object Name Prefix: ${metadata.object_name_prefix}`);
    console.log(`Etag: ${metadata.etag}`);
    console.log(`Self Link: ${metadata.selfLink}`);
    console.log(`Kind: ${metadata.kind}`);
  }

  getMetadata().catch(console.error);
  // [END storage_print_pubsub_bucket_notification]
}
main(...process.argv.slice(2));
