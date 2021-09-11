
//




/**
 * This application demonstrates how to use Bucket Lock operations on buckets
 * and objects using the Google Cloud Storage API.
 *
 * For more information read the documentation
 * at https://cloud.google.com/storage/docs/bucket-lock
 */

function main(bucketName = 'my-bucket', fileName = 'test.txt') {
  // [START storage_release_temporary_hold]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The ID of your GCS file
  // const fileName = 'your-file-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function releaseTemporaryHold() {
    await storage.bucket(bucketName).file(fileName).setMetadata({
      temporaryHold: false,
    });
    console.log(`Temporary hold was released for ${fileName}.`);
  }

  releaseTemporaryHold().catch(console.error);
  // [END storage_release_temporary_hold]
}
main(...process.argv.slice(2));
