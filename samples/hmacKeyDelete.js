
//




'use strict';

// sample-metadata:
//   title: Delete HMAC SA Key.
//   description: Delete HMAC SA Key.
//   usage: node hmacKeyDelete.js <hmacKeyAccessId> [projectId]

function main(
  hmacKeyAccessId = 'GOOG0234230X00',
  projectId = 'serviceAccountProjectId'
) {
  // [START storage_delete_hmac_key]
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

  // Delete HMAC SA Key
  async function deleteHmacKey() {
    const hmacKey = storage.hmacKey(hmacKeyAccessId, {projectId});
    await hmacKey.delete();

    console.log(
      'The key is deleted, though it may still appear in getHmacKeys() results.'
    );
  }
  // [END storage_delete_hmac_key]
  deleteHmacKey().catch(console.error);
}

main(...process.argv.slice(2));
