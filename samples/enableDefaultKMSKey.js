
//




/**
 * This application demonstrates how to perform basic operations on buckets with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(
  bucketName = 'my-bucket',
  defaultKmsKeyName = process.env.GOOGLE_CLOUD_KMS_KEY_ASIA
) {
  // [START storage_set_bucket_default_kms_key]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The name of the KMS-key to use as a default
  // const defaultKmsKeyName = 'my-key';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function enableDefaultKMSKey() {
    await storage.bucket(bucketName).setMetadata({
      encryption: {
        defaultKmsKeyName,
      },
    });

    console.log(
      `Default KMS key for ${bucketName} was set to ${defaultKmsKeyName}.`
    );
  }

  enableDefaultKMSKey().catch(console.error);
  // [END storage_set_bucket_default_kms_key]
}

main(...process.argv.slice(2));
