
//




/**
 * This application demonstrates how to perform basic operations on bucket and
 * file Access Control Lists with the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket', userEmail = 'jdobry@google.com') {
  // [START storage_print_bucket_acl_for_user]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The email address of the user to check
  // const userEmail = 'user-email-to-check';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function printBucketAclForUser() {
    const options = {
      // Specify the user
      entity: `user-${userEmail}`,
    };

    // Gets the user's ACL for the bucket
    const [aclObject] = await storage.bucket(bucketName).acl.get(options);

    console.log(`${aclObject.role}: ${aclObject.entity}`);
  }

  printBucketAclForUser().catch(console.error);
  // [END storage_print_bucket_acl_for_user]
}

main(...process.argv.slice(2));
