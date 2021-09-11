
//




/**
 * This application demonstrates how to perform basic operations on bucket and
 * file Access Control Lists with the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket', fileName = 'test.txt') {
  // [START storage_print_file_acl]
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

  async function printFileAcl() {
    // Gets the ACL for the file
    const [acls] = await storage.bucket(bucketName).file(fileName).acl.get();

    acls.forEach(acl => {
      console.log(`${acl.role}: ${acl.entity}`);
    });
  }

  printFileAcl().catch(console.error);
  // [END storage_print_file_acl]
}
main(...process.argv.slice(2));
