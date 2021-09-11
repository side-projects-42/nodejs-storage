
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
  roleName = 'roles/storage.objectViewer',
  title = 'match-prefix',
  description = 'Applies to objects matching a prefix',
  expression = 'resource.name.startsWith("projects/_/buckets/bucket-name/objects/prefix-a-")',
  members = 'user:test@example.com'
) {
  members = members.split(',');
  // [START storage_add_bucket_conditional_iam_binding]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The role to grant
  // const roleName = 'roles/storage.objectViewer';

  // The members to grant the new role to
  // const members = [
  //   'user:jdoe@example.com',
  //   'group:admins@example.com',
  // ];

  // Create a condition
  // const title = 'Title';
  // const description = 'Description';
  // const expression = 'resource.name.startsWith(\"projects/_/buckets/bucket-name/objects/prefix-a-\")';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function addBucketConditionalBinding() {
    // Get a reference to a Google Cloud Storage bucket
    const bucket = storage.bucket(bucketName);

    // Gets and updates the bucket's IAM policy
    const [policy] = await bucket.iam.getPolicy({requestedPolicyVersion: 3});

    // Set the policy's version to 3 to use condition in bindings.
    policy.version = 3;

    // Adds the new roles to the bucket's IAM policy
    policy.bindings.push({
      role: roleName,
      members: members,
      condition: {
        title: title,
        description: description,
        expression: expression,
      },
    });

    // Updates the bucket's IAM policy
    await bucket.iam.setPolicy(policy);

    console.log(
      `Added the following member(s) with role ${roleName} to ${bucketName}:`
    );

    members.forEach(member => {
      console.log(`  ${member}`);
    });

    console.log('with condition:');
    console.log(`  Title: ${title}`);
    console.log(`  Description: ${description}`);
    console.log(`  Expression: ${expression}`);
  }

  addBucketConditionalBinding().catch(console.error);
  // [END storage_add_bucket_conditional_iam_binding]
}
main(...process.argv.slice(2));
