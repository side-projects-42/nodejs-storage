
//




/**
 * This application demonstrates how to perform basic operations on buckets with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

const uuid = require('uuid');
const path = require('path');

function main(
  projectId = 'cloud-devrel-public-resources',
  bucketName = `nodejs-storage-samples-${uuid.v4()}`,
  srcFileName = 'test.txt',
  destFileName = path.join(__dirname, `test_${uuid.v4()}.txt`)
) {
  // [START storage_download_file_requester_pays]

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The project ID to bill
  // const projectId = 'my-billable-project-id';

  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The ID of your GCS file
  // const srcFileName = 'your-file-name';

  // The path to which the file should be downloaded
  // const destFileName = '/local/path/to/file.txt';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function downloadFileUsingRequesterPays() {
    const options = {
      destination: destFileName,
      userProject: projectId,
    };

    // Downloads the file
    await storage.bucket(bucketName).file(srcFileName).download(options);

    console.log(
      `gs://${bucketName}/${srcFileName} downloaded to ${destFileName} using requester-pays requests`
    );
  }

  downloadFileUsingRequesterPays().catch(console.error);
  // [END storage_download_file_requester_pays]
}
main(...process.argv.slice(2));
