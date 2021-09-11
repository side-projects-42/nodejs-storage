
//




/**
 * This application demonstrates how to perform basic operations on bucket and
 * file Access Control Lists with the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(
  bucketName = 'my-bucket',
  fileName = 'test.txt',
  userEmail = 'jdobry@google.com'
) {
  // [START storage_print_file_acl_for_user]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The ID of your GCS file
  // const fileName = 'your-file-name';

  // The email address of the user to check
  // const userEmail = 'user-email-to-check';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function printFileAclForUser() {
    const options = {
      // Specify the user
      entity: `user-${userEmail}`,
    };

    // Gets the user's ACL for the file
    const [aclObject] = await storage
      .bucket(bucketName)
      .file(fileName)
      .acl.get(options);

    console.log(`${aclObject.role}: ${aclObject.entity}`);
  }

  printFileAclForUser().catch(console.error);
  // [END storage_print_file_acl_for_user]
}
main(...process.argv.slice(2));
