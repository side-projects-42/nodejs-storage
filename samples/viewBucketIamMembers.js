
//




function main(bucketName = 'my-bucket') {
  // [START storage_view_bucket_iam_members]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function viewBucketIamMembers() {
    // For more information please read:
    // https://cloud.google.com/storage/docs/access-control/iam
    const results = await storage
      .bucket(bucketName)
      .iam.getPolicy({requestedPolicyVersion: 3});

    const bindings = results[0].bindings;

    console.log(`Bindings for bucket ${bucketName}:`);
    for (const binding of bindings) {
      console.log(`  Role: ${binding.role}`);
      console.log('  Members:');

      const members = binding.members;
      for (const member of members) {
        console.log(`    ${member}`);
      }

      const condition = binding.condition;
      if (condition) {
        console.log('  Condiiton:');
        console.log(`    Title: ${condition.title}`);
        console.log(`    Description: ${condition.description}`);
        console.log(`    Expression: ${condition.expression}`);
      }
    }
  }

  viewBucketIamMembers().catch(console.error);
  // [END storage_view_bucket_iam_members]
}
main(...process.argv.slice(2));
