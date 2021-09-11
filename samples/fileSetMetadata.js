
//




'use strict';

// sample-metadata:
//   title: Storage Set File Metadata.
//   description: Set file metadata.
//   usage: node fileSetMetadata.js <BUCKET_NAME> <FILE_NAME>

function main(bucketName = 'my-bucket', fileName = 'file.txt') {
  // [START storage_set_metadata]
  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The ID of your GCS file
  // const fileName = 'your-file-name';

  async function setFileMetadata() {
    // Set file metadata.
    const [metadata] = await storage
      .bucket(bucketName)
      .file(fileName)
      .setMetadata({
        // Predefinded metadata for server e.g. 'cacheControl', 'contentDisposition',
        // 'contentEncoding', 'contentLanguage', 'contentType'
        contentDisposition: 'attachment; filename*=utf-8\'\'"anotherImage.jpg"',
        contentType: 'image/jpeg',

        // A note or actionable items for user e.g. uniqueId, object description,
        // or other useful information.
        metadata: {
          description: 'file description...',
          modified: '1900-01-01',
        },
      });

    console.log(
      'Updated metadata for object',
      fileName,
      'in bucket ',
      bucketName
    );
    console.log(metadata);
  }

  setFileMetadata().catch(console.error);
  // [END storage_set_metadata]
}

main(...process.argv.slice(2));
