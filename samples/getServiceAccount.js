// Copyright 2021 Google LLC
//




'use strict';

// sample-metadata:
//   title: Storage Get Service Account.
//   description: Get Service Account.
//   usage: node getServiceAccount.js <PROJECT_ID>

function main(projectId = 'serviceAccountProjectId') {
  // [START storage_get_service_account]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCP project
  // const projectId = 'your-project-id';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage({
    projectId,
  });

  async function getServiceAccount() {
    const [serviceAccount] = await storage.getServiceAccount();
    console.log(
      `The GCS service account for project ${projectId} is: ${serviceAccount.emailAddress}`
    );
  }

  getServiceAccount().catch(console.error);
  // [END storage_get_service_account]
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
