
//




import * as assert from 'assert';
import {describe, it} from 'mocha';
import * as proxyquire from 'proxyquire';

const error = Error('not implemented');

interface Request {
  headers: {
    [key: string]: string;
  };
}

describe('headers', () => {
  const requests: Request[] = [];
  const {Storage} = proxyquire('../src', {
    'google-auth-library': {
      GoogleAuth: class {
        async getProjectId() {
          return 'foo-project';
        }
        async getClient() {
          return class {
            async request() {
              return {};
            }
          };
        }
        getCredentials() {
          return {};
        }
        async authorizeRequest(req: Request) {
          requests.push(req);
          throw error;
        }
      },
      '@global': true,
    },
  });

  it('populates x-goog-api-client header', async () => {
    const storage = new Storage();
    const bucket = storage.bucket('foo-bucket');
    try {
      await bucket.create();
    } catch (err) {
      if (err !== error) throw err;
    }
    assert.ok(
      /^gl-node\/[0-9]+\.[0-9]+\.[-.\w]+ gccl\/[0-9]+\.[0-9]+\.[-.\w]+$/.test(
        requests[0].headers['x-goog-api-client']
      )
    );
  });
});
