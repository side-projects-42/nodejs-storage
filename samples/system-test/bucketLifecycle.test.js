
//




'use strict';

const {Storage} = require('@google-cloud/storage');
const {assert} = require('chai');
const {before, beforeEach, after, describe, it} = require('mocha');
const cp = require('child_process');
const uuid = require('uuid');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const storage = new Storage();
const bucketName = `nodejs-storage-samples-${uuid.v4()}`;
const bucket = storage.bucket(bucketName);

describe('Bucket lifecycle management', () => {
  before(async () => {
    await bucket.create();
  });

  beforeEach(async () => {
    await bucket.setMetadata({lifecycle: null});
  });

  after(async () => {
    await bucket.delete().catch(console.error);
  });

  it('should add a lifecycle delete rule', async () => {
    const output = execSync(
      `node enableBucketLifecycleManagement.js ${bucketName}`
    );
    assert.include(
      output,
      `Lifecycle management is enabled for bucket ${bucketName} and the rules are:`
    );
    const [metadata] = await bucket.getMetadata();
    assert.deepStrictEqual(metadata.lifecycle.rule[0], {
      action: {type: 'Delete'},
      condition: {age: 100},
    });
  });

  it('should disable all lifecycle rules', async () => {
    // Add a lifecycle rule in order for the sample to delete.
    await bucket.addLifecycleRule({
      action: 'delete',
      condition: {age: 100},
    });

    const [metadata] = await bucket.getMetadata();
    assert.deepStrictEqual(metadata.lifecycle.rule[0], {
      action: {type: 'Delete'},
      condition: {age: 100},
    });

    const output = execSync(
      `node disableBucketLifecycleManagement.js ${bucketName}`
    );
    assert.include(
      output,
      `Lifecycle management is disabled for bucket ${bucketName}`
    );
    const [newMetadata] = await bucket.getMetadata();
    assert.isUndefined(newMetadata.lifecycle);
  });
});
