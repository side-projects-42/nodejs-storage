
//




/**
 * This application demonstrates how to perform basic operations on bucket and
 * file Access Control Lists with the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket', userEmail = 'jdobry@google.com') {
  // [START storage_remove_bucket_owner]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The email address of the user to remove
  // const userEmail = 'user-email-to-remove';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function removeBucketOwner() {
    // Removes the user from the access control list of the bucket. You can use
    // deleteAllUsers(), deleteDomain(), deleteProject(), deleteGroup(), and
    // deleteAllAuthenticatedUsers() to remove access for different types of entities.
    await storage.bucket(bucketName).acl.owners.deleteUser(userEmail);

    console.log(`Removed user ${userEmail} from bucket ${bucketName}.`);
  }

  removeBucketOwner().catch(console.error);

  // [END storage_remove_bucket_owner]
}

main(...process.argv.slice(2));
