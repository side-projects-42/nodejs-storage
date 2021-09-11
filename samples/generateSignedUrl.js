
//




/**
 * This application demonstrates how to perform basic operations on files with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket', fileName = 'test.txt') {
  // [START storage_generate_signed_url]
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

  async function generateSignedUrl() {
    // These options will allow temporary read access to the file
    const options = {
      version: 'v2', // defaults to 'v2' if missing.
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60, // one hour
    };

    // Get a v2 signed URL for the file
    const [url] = await storage
      .bucket(bucketName)
      .file(fileName)
      .getSignedUrl(options);

    console.log(`The signed url for ${fileName} is ${url}.`);
  }

  generateSignedUrl().catch(console.error);
  // [END storage_generate_signed_url]
}
main(...process.argv.slice(2));
