
//




'use strict';

const fs = require('fs');
const {Storage} = require('@google-cloud/storage');
const {assert} = require('chai');
const {before, after, it} = require('mocha');
const cp = require('child_process');
const uuid = require('uuid');
const path = require('path');
const {promisify} = require('util');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const storage = new Storage();
const cwd = path.join(__dirname, '..');
const bucketName = `nodejs-storage-samples-${uuid.v4()}`;
const fileName = 'test.txt';
const bucket = storage.bucket(bucketName);
const projectId = process.env.GCLOUD_PROJECT;

const uploadFilePath = path.join(cwd, 'resources', fileName);
const downloadFilePath = path.join(__dirname, `test_${uuid.v4()}.txt`);

before(async () => {
  await bucket.create();
  // Upload a test file (to download later)
  await bucket.upload(uploadFilePath);
});

after(async () => {
  await promisify(fs.unlink)(downloadFilePath).catch(console.error);
  // Try deleting all files twice, just to make sure
  await bucket.deleteFiles({force: true}).catch(console.error);
  await bucket.deleteFiles({force: true}).catch(console.error);
  await bucket.delete().catch(console.error);
});

it.skip('should error on requester-pays requests if they are disabled', () => {
  const result = execSync(
    `node downloadFileUsingRequesterPays.js ${projectId} ${bucketName} ${fileName} ${downloadFilePath}`
  );
  assert.ok(result.stderr);
  assert.match(
    result.stderr,
    /User project prohibited for non requester pays bucket/
  );
});

it('should fetch requester-pays status on a default bucket', () => {
  const out = execSync(`node getRequesterPaysStatus.js ${bucketName}`);
  assert.include(
    out,
    `Requester-pays requests are disabled for bucket ${bucketName}`
  );
});

it('should enable requester-pays requests', () => {
  const out = execSync(`node enableRequesterPays.js ${bucketName}`);
  assert.include(
    out,
    `Requester-pays requests have been enabled for bucket ${bucketName}`
  );
});

it('should fetch requester-pays status on a modified bucket', () => {
  const out = execSync(`node getRequesterPaysStatus.js ${bucketName}`);
  assert.include(
    out,
    `Requester-pays requests are enabled for bucket ${bucketName}.`
  );
});

it('should download a file using requester-pays requests', () => {
  const out = execSync(
    `node downloadFileUsingRequesterPays.js ${projectId} ${bucketName} ${fileName} ${downloadFilePath}`
  );
  assert.include(
    out,
    `gs://${bucketName}/${fileName} downloaded to ${downloadFilePath} using requester-pays requests`
  );
  fs.statSync(downloadFilePath);
});

it('should disable requester-pays requests', () => {
  const out = execSync(`node disableRequesterPays.js ${bucketName}`);
  assert.include(
    out,
    `Requester-pays requests have been disabled for bucket ${bucketName}`
  );
});

it('should get service account', () => {
  const out = execSync(`node getServiceAccount.js ${projectId}`);
  assert.include(out, '@gs-project-accounts.iam.gserviceaccount.com');
});
