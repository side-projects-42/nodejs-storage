
//




/**
 * This application demonstrates how to perform basic operations on files with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket', fileName = 'test.txt') {
  // [START storage_generate_signed_url_v4]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   * Note: when creating a signed URL, unless running in a GCP environment,
   * a service account must be used for authorization.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The full path of your file inside the GCS bucket, e.g. 'yourFile.jpg' or 'folder1/folder2/yourFile.jpg'
  // const fileName = 'your-file-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function generateV4ReadSignedUrl() {
    // These options will allow temporary read access to the file
    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    // Get a v4 signed URL for reading the file
    const [url] = await storage
      .bucket(bucketName)
      .file(fileName)
      .getSignedUrl(options);

    console.log('Generated GET signed URL:');
    console.log(url);
    console.log('You can use this URL with any user agent, for example:');
    console.log(`curl '${url}'`);
  }

  generateV4ReadSignedUrl().catch(console.error);
  // [END storage_generate_signed_url_v4]
}
main(...process.argv.slice(2));
