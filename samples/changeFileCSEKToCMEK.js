// Copyright 2021 Google LLC
//




'use strict';

// sample-metadata:
//   title: Storage File Convert CSEK to CMEK.
//   description: Storage File Convert CSEK to CMEK.
//   usage: node changeFileCSEKToCMEK.js <BUCKET_NAME> <FILE_NAME> <ENCRYPTION_KEY> <KMS_KEY_NAME>

function main(
  bucketName = 'my-bucket',
  fileName = 'test.txt',
  encryptionKey = 'my-encription-key',
  kmsKeyName = 'my-kms-key'
) {
  // [START storage_object_csek_to_cmek]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The ID of your GCS file
  // const fileName = 'your-file-name';

  // The Base64 encoded decryption key, which should be the same key originally
  // used to encrypt the file
  // const encryptionKey = 'TIbv/fjexq+VmtXzAlc63J4z5kFmWJ6NdAPQulQBT7g=';

  // The name of the KMS key to manage this file with
  // const kmsKeyName = 'projects/your-project-id/locations/global/keyRings/your-key-ring/cryptoKeys/your-key';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function changeFileCSEKToCMEK() {
    await storage
      .bucket(bucketName)
      .file(fileName, {
        encryptionKey: Buffer.from(encryptionKey, 'base64'),
      })
      .rotateEncryptionKey({
        kmsKeyName,
      });

    console.log(
      `file ${fileName} in bucket ${bucketName} is now managed by KMS key ${kmsKeyName} instead of customer-supplied encryption key`
    );
  }

  changeFileCSEKToCMEK().catch(console.error);
  // [END storage_object_csek_to_cmek]
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
