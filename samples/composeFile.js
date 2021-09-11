// Copyright 2021 Google LLC
//




'use strict';

// sample-metadata:
//   title: Storage Combine files.
//   description: Combine multiple files into one new file.
//   usage: node composeFile.js <BUCKET_NAME> <FIRST_FILE_NAME> <SECOND_FILE_NAME> <DESTINATION_FILE_NAME>

function main(
  bucketName = 'my-bucket',
  firstFileName = 'file-one.txt',
  secondFileName = 'file-two.txt',
  destinationFileName = 'file-one-two.txt'
) {
  // [START storage_compose_file]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The ID of the first GCS file to compose
  // const firstFileName = 'your-first-file-name';

  // The ID of the second GCS file to compose
  // const secondFileName = 'your-second-file-name';

  // The ID to give the new composite file
  // const destinationFileName = 'new-composite-file-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function composeFile() {
    const bucket = storage.bucket(bucketName);
    const sources = [firstFileName, secondFileName];

    await bucket.combine(sources, destinationFileName);

    console.log(
      `New composite file ${destinationFileName} was created by combining ${firstFileName} and ${secondFileName}`
    );
  }

  composeFile().catch(console.error);
  // [END storage_compose_file]
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
