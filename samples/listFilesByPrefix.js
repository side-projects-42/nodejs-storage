
//




/**
 * This application demonstrates how to perform basic operations on files with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

function main(bucketName = 'my-bucket', prefix = 'test', delimiter = '/') {
  // [START storage_list_files_with_prefix]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The directory prefix to search for
  // const prefix = 'myDirectory/';

  // The delimiter to use
  // const delimiter = '/';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function listFilesByPrefix() {
    /**
     * This can be used to list all blobs in a "folder", e.g. "public/".
     *
     * The delimiter argument can be used to restrict the results to only the
     * "files" in the given "folder". Without the delimiter, the entire tree under
     * the prefix is returned. For example, given these blobs:
     *
     *   /a/1.txt
     *   /a/b/2.txt
     *
     * If you just specify prefix = 'a/', you'll get back:
     *
     *   /a/1.txt
     *   /a/b/2.txt
     *
     * However, if you specify prefix='a/' and delimiter='/', you'll get back:
     *
     *   /a/1.txt
     */
    const options = {
      prefix: prefix,
    };

    if (delimiter) {
      options.delimiter = delimiter;
    }

    // Lists files in the bucket, filtered by a prefix
    const [files] = await storage.bucket(bucketName).getFiles(options);

    console.log('Files:');
    files.forEach(file => {
      console.log(file.name);
    });
  }

  listFilesByPrefix().catch(console.error);
  // [END storage_list_files_with_prefix]
}
main(...process.argv.slice(2));
