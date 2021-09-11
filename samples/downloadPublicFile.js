// Copyright 2021 Google LLC
//




'use strict';

// sample-metadata:
//   title: Storage Download Public File.
//   description: Download Public File.
//   usage: node downloadPublicFile.js <BUCKET_NAME> <SRC_FILE_NAME> <DEST_FILE_NAME>

const path = require('path');
const cwd = path.join(__dirname, '..');

function main(
  bucketName = 'my-bucket',
  srcFileName = 'test.txt',
  destFileName = path.join(cwd, 'downloaded.txt')
) {
  // [START storage_download_public_file]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The ID of your GCS file
  // const srcFilename = 'your-file-name';

  // The path to which the file should be downloaded
  // const destFileName = '/local/path/to/file.txt';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function downloadPublicFile() {
    const options = {
      destination: destFileName,
    };

    // Download public file.
    await storage.bucket(bucketName).file(srcFileName).download(options);

    console.log(
      `Downloaded public file ${srcFileName} from bucket name ${bucketName} to ${destFileName}`
    );
  }

  downloadPublicFile().catch(console.error);
  // [END storage_download_public_file]
}
main(...process.argv.slice(2));
