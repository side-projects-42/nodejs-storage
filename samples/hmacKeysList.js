
//




'use strict';

// sample-metadata:
//   title: List HMAC SA Keys Metadata.
//   description: List HMAC SA Keys Metadata.
//   usage: node hmacKeyList.js [projectId]

function main(projectId = 'serviceAccountProjectId') {
  // [START storage_list_hmac_keys]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of the project to which the service account belongs
  // const projectId = 'project-id';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  // List HMAC SA Keys' Metadata
  async function listHmacKeys() {
    const [hmacKeys] = await storage.getHmacKeys({projectId});

    // hmacKeys is an array of HmacKey objects.
    for (const hmacKey of hmacKeys) {
      console.log(
        `Service Account Email: ${hmacKey.metadata.serviceAccountEmail}`
      );
      console.log(`Access Id: ${hmacKey.metadata.accessId}`);
    }
  }
  // [END storage_list_hmac_keys]
  listHmacKeys().catch(console.error);
}

main(...process.argv.slice(2));
