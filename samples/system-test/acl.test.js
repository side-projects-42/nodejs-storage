
//




'use strict';

const {Storage} = require('@google-cloud/storage');
const {assert} = require('chai');
const {before, after, it} = require('mocha');
const cp = require('child_process');
const uuid = require('uuid');
const path = require('path');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const storage = new Storage();
const bucketName = `nodejs-storage-samples-${uuid.v4()}`;
const bucket = storage.bucket(bucketName);
const userEmail = 'jdobry@google.com';
const fileName = 'test.txt';
const filePath = path.join(__dirname, '..', 'resources', fileName);

before(async () => {
  await bucket.create();
  await bucket.upload(filePath);
});

after(async () => {
  try {
    await bucket.deleteFiles({force: true});
  } catch (err) {
    // ignore error
  }
  try {
    await bucket.deleteFiles({force: true});
  } catch (err) {
    // ignore error
  }
  try {
    await bucket.delete();
  } catch (err) {
    // ignore error
  }
});

it('should print acl for a bucket', () => {
  const out = execSync(`node printBucketAcl.js ${bucketName}`);
  assert.match(out, /OWNER: project-editors-/);
  assert.match(out, /OWNER: project-owners-/);
  assert.match(out, /READER: project-viewers-/);
});

it('should print acl for a file', () => {
  const out = execSync(`node printFileAcl.js ${bucketName} ${fileName}`);
  assert.match(out, /OWNER: project-editors-/);
  assert.match(out, /OWNER: project-owners-/);
  assert.match(out, /READER: project-viewers-/);
});

it('should print a users acl for a bucket', async () => {
  await bucket.acl.readers.addUser(userEmail);
  const out = execSync(
    `node printBucketAclForUser.js ${bucketName} ${userEmail}`
  );
  assert.match(out, new RegExp(`READER: user-${userEmail}`));
  await bucket.acl.readers.deleteUser(userEmail);
});

it('should add a user as an owner on a bucket', () => {
  const out = execSync(`node addBucketOwnerAcl.js ${bucketName} ${userEmail}`);
  assert.match(
    out,
    new RegExp(`Added user ${userEmail} as an owner on bucket ${bucketName}.`)
  );
});

it('should remove a user from a bucket', () => {
  const out = execSync(
    `node removeBucketOwnerAcl.js ${bucketName} ${userEmail}`
  );
  assert.match(
    out,
    new RegExp(`Removed user ${userEmail} from bucket ${bucketName}.`)
  );
});

it('should add a user as a default owner on a bucket', () => {
  const out = execSync(
    `node addBucketDefaultOwnerAcl.js ${bucketName} ${userEmail}`
  );
  assert.match(
    out,
    new RegExp(`Added user ${userEmail} as an owner on bucket ${bucketName}.`)
  );
});

it('should remove a default user from a bucket', () => {
  const out = execSync(
    `node removeBucketDefaultOwner.js ${bucketName} ${userEmail}`
  );
  assert.match(
    out,
    new RegExp(`Removed user ${userEmail} from bucket ${bucketName}.`)
  );
});

it('should print a users acl for a file', async () => {
  await bucket.file(fileName).acl.readers.addUser(userEmail);
  const out = execSync(
    `node printFileAclForUser.js ${bucketName} ${fileName} ${userEmail}`
  );
  assert.match(out, new RegExp(`READER: user-${userEmail}`));
  await bucket.file(fileName).acl.readers.deleteUser(userEmail);
});

it('should add a user as an owner on a bucket', () => {
  const out = execSync(
    `node addFileOwnerAcl.js ${bucketName} ${fileName} ${userEmail}`
  );
  assert.match(
    out,
    new RegExp(`Added user ${userEmail} as an owner on file ${fileName}.`)
  );
});

it('should remove a user from a bucket', () => {
  const out = execSync(
    `node removeFileOwnerAcl.js ${bucketName} ${fileName} ${userEmail}`
  );
  assert.match(
    out,
    new RegExp(`Removed user ${userEmail} from file ${fileName}.`)
  );
});
