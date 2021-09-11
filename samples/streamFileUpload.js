// Copyright 2021 Google LLC
//




/**
 * This application demonstrates how to perform basic operations on files with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket', destFileName = 'file.txt') {
  // [START storage_stream_file_upload]
  /**
   * TODO(developer): Uncomment the following lines before running the sample
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The new ID for your GCS file
  // const destFileName = 'your-new-file-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Import Node.js stream
  const stream = require('stream');

  // Creates a client
  const storage = new Storage();

  // Get a reference to the bucket
  const myBucket = storage.bucket(bucketName);

  // Create a reference to a file object
  const file = myBucket.file(destFileName);

  // Create a pass through stream from a string
  const passthroughStream = new stream.PassThrough();
  passthroughStream.write('input text');
  passthroughStream.end();

  async function streamFileUpload() {
    passthroughStream.pipe(file.createWriteStream()).on('finish', () => {
      // The file upload is complete
    });

    console.log(`${destFileName} uploaded to ${bucketName}`);
  }

  streamFileUpload().catch(console.error);
  // [END storage_stream_file_upload]
}

main(...process.argv.slice(2));
