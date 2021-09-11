
//




'use strict';

const {assert} = require('chai');
const {after, it} = require('mocha');
const cp = require('child_process');
const uuid = require('uuid');
const {Storage} = require('@google-cloud/storage');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const storage = new Storage();
const bucketName = `nodejs-storage-samples-${uuid.v4()}`;

after(async () => {
  const bucket = storage.bucket(bucketName);
  await bucket.delete().catch(console.error);
});

it('should run the quickstart', async () => {
  const stdout = execSync(`node quickstart ${bucketName}`);
  assert.match(stdout, /Bucket .* created./);
});
