
//




'use strict';

// sample-metadata:
//   title: List Files with Old Versions.
//   description: List Files with Old Versions.
//   usage: node listFilesWithOldVersions.js <BUCKET_NAME>

function main(bucketName = 'my-bucket') {
  // [START storage_list_file_archived_generations]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function listFilesWithOldVersions() {
    const [files] = await storage.bucket(bucketName).getFiles({
      versions: true,
    });

    console.log('Files:');
    files.forEach(file => {
      console.log(file.name, file.generation);
    });
  }

  listFilesWithOldVersions().catch(console.error);
  // [END storage_list_file_archived_generations]
}
main(...process.argv.slice(2));
