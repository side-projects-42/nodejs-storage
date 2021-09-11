
function main(bucketName = 'my-bucket') {
  // [START storage_create_bucket]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  // The bucket in the sample below will be created in the project asscociated with this client.
  // For more information, please see https://cloud.google.com/docs/authentication/production or https://googleapis.dev/nodejs/storage/latest/Storage.html
  const storage = new Storage();

  async function createBucket() {
    // Creates a new bucket in the Asia region with the coldline default storage
    // class. Leave the second argument blank for default settings.
        // For default values see: https://cloud.google.com/storage/docs/locations and
    // https://cloud.google.com/storage/docs/storage-classes

    const [bucket] = await storage.createBucket(bucketName, {
      location: 'ASIA',
      storageClass: 'COLDLINE',
    });

    console.log(`Bucket ${bucket.name} created.`);
  }

  createBucket().catch(console.error);
  // [END storage_create_bucket]
}

main(...process.argv.slice(2));
