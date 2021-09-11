
//




'use strict';

const {PubSub} = require('@google-cloud/pubsub');
const {Storage} = require('@google-cloud/storage');
const {assert} = require('chai');
const {before, after, it} = require('mocha');
const cp = require('child_process');
const uuid = require('uuid');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const storage = new Storage();
const bucketName = `nodejs-storage-samples-${uuid.v4()}`;
const bucket = storage.bucket(bucketName);
const notificationId = '1';
const notification = bucket.notification(notificationId);
const topicName = `nodejs-storage-samples-${uuid.v4()}`;
const pubsub = new PubSub();
const topic = pubsub.topic(topicName);

before(async () => {
  await bucket.create();
  await topic.create();
  await topic.iam.setPolicy({
    bindings: [
      {
        role: 'roles/pubsub.editor',
        members: ['allUsers'],
      },
    ],
  });
});

after(async () => {
  await bucket.delete().catch(console.error);
  await topic.delete().catch(console.error);
});

it('should create a notification', async () => {
  const output = execSync(
    `node createNotification.js ${bucketName} ${topicName}`
  );
  assert.match(output, /Notification subscription created./);
  const [exists] = await notification.exists();
  assert.strictEqual(exists, true);
});

it('should list notifications', async () => {
  const output = execSync(`node listNotifications.js ${bucketName}`);
  assert.match(output, /Notifications:/);
  assert.match(output, new RegExp(notificationId));
});

it('should get metadata', async () => {
  const metadata = await notification.getMetadata();
  const output = execSync(
    `node getMetadataNotifications.js ${bucketName} ${notificationId}`
  );
  assert.match(output, /ID:/);
  assert.match(output, new RegExp(metadata.id));
  assert.match(output, /Topic:/);
  assert.match(output, new RegExp(metadata.topic));
  assert.match(output, /Event Types:/);
  assert.match(output, new RegExp(metadata.event_types));
  assert.match(output, /Custom Attributes:/);
  assert.match(output, new RegExp(metadata.custom_attributes));
  assert.match(output, /Payload Format:/);
  assert.match(output, new RegExp(metadata.payload_format));
  assert.match(output, /Object Name Prefix:/);
  assert.match(output, new RegExp(metadata.object_name_prefix));
  assert.match(output, /Etag:/);
  assert.match(output, /Self Link:/);
  assert.match(output, new RegExp(metadata.selfLink));
  assert.match(output, /Kind:/);
  assert.match(output, new RegExp(metadata.kind));
});

it('should delete a notification', async () => {
  const output = execSync(
    `node deleteNotification.js ${bucketName} ${notificationId}`
  );
  assert.match(output, new RegExp(`Notification ${notificationId} deleted.`));
  const [exists] = await notification.exists();
  assert.strictEqual(exists, false);
});
