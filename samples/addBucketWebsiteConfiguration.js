// Copyright 2021 Google LLC
//




'use strict';

// sample-metadata:
//   title: Bucket Website Configuration.
//   description: Bucket Website Configuration.
//   usage: node addBucketWebsiteConfiguration.js <BUCKET_NAME> <MAIN_PAGE_SUFFIX> <NOT_FOUND_PAGE>

function main(
  bucketName = 'my-bucket',
  mainPageSuffix = 'http://example.com',
  notFoundPage = 'http://example.com/404.html'
) {
  // [START storage_define_bucket_website_configuration]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The name of the main page
  // const mainPageSuffix = 'http://example.com';

  // The Name of a 404 page
  // const notFoundPage = 'http://example.com/404.html';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function addBucketWebsiteConfiguration() {
    await storage.bucket(bucketName).setMetadata({
      website: {
        mainPageSuffix,
        notFoundPage,
      },
    });

    console.log(
      `Static website bucket ${bucketName} is set up to use ${mainPageSuffix} as the index page and ${notFoundPage} as the 404 page`
    );
  }

  addBucketWebsiteConfiguration().catch(console.error);
  // [END storage_define_bucket_website_configuration]
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
