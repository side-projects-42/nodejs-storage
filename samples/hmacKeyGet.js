
//




'use strict';

// sample-metadata:
//   title: Get HMAC SA Key Metadata.
//   description: Get HMAC SA Key Metadata.
//   usage: node hmacKeyGet.js <hmacKeyAccessId> [projectId]

function main(
  hmacKeyAccessId = 'GOOG0234230X00',
  projectId = 'serviceAccountProjectId'
) {
  // [START storage_get_hmac_key]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The access ID of the HMAC key
  // const hmacKeyAccessId = 'GOOG0234230X00';

  // The ID of the project to which the service account belongs
  // const projectId = 'project-id';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  // Get HMAC SA Key Metadata
  async function getHmacKey() {
    const hmacKey = storage.hmacKey(hmacKeyAccessId, {projectId});

    // Populate the hmacKey object with metadata from server.
    await hmacKey.getMetadata();

    console.log('The HMAC key metadata is:');
    for (const [key, value] of Object.entries(hmacKey.metadata)) {
      console.log(`${key}: ${value}`);
    }
  }
  // [END storage_get_hmac_key]
  getHmacKey().catch(console.error);
}

main(...process.argv.slice(2));
