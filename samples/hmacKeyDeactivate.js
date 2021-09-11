
//




'use strict';

// sample-metadata:
//   title: Deactivate HMAC SA Key.
//   description: Deactivate HMAC SA Key.
//   usage: node hmacKeyDeactivate.js <hmacKeyAccessId> [projectId]

function main(
  hmacKeyAccessId = 'GOOG0234230X00',
  projectId = 'serviceAccountProjectId'
) {
  // [START storage_deactivate_hmac_key]
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

  // Deactivate HMAC SA Key
  async function deactivateHmacKey() {
    const hmacKey = storage.hmacKey(hmacKeyAccessId, {projectId});
    const [hmacKeyMetadata] = await hmacKey.setMetadata({state: 'INACTIVE'});

    console.log('The HMAC key is now inactive.');
    console.log('The HMAC key metadata is:');
    for (const [key, value] of Object.entries(hmacKeyMetadata)) {
      console.log(`${key}: ${value}`);
    }
  }
  // [END storage_deactivate_hmac_key]
  deactivateHmacKey().catch(console.error);
}

main(...process.argv.slice(2));
