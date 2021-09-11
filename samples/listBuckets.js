
function main() {
  // [START storage_list_buckets]
  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function listBuckets() {
    const [buckets] = await storage.getBuckets();

    console.log('Buckets:');
    buckets.forEach(bucket => {
      console.log(bucket.name);
    });
  }

  listBuckets().catch(console.error);
  // [END storage_list_buckets]
}

main(...process.argv.slice(2));
