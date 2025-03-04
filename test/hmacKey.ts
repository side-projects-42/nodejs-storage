
//




import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import * as assert from 'assert';
import {describe, it, beforeEach, afterEach} from 'mocha';
import {util, ServiceObject} from '@google-cloud/common';

const sandbox = sinon.createSandbox();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let STORAGE: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let hmacKey: any;

const ACCESS_ID = 'fake-access-id';

describe('HmacKey', () => {
  afterEach(() => sandbox.restore());

  describe('initialization', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let serviceObjectSpy: sinon.SinonSpy;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let commonModule: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let HmacKey: any;

    beforeEach(() => {
      commonModule = {ServiceObject};
      serviceObjectSpy = sandbox.spy(commonModule, 'ServiceObject');

      HmacKey = proxyquire('../src/hmacKey', {
        '@google-cloud/common': commonModule,
      }).HmacKey;

      STORAGE = {
        request: util.noop,
        projectId: 'my-project',
      };

      hmacKey = new HmacKey(STORAGE, ACCESS_ID);
    });

    it('should inherit from ServiceObject', () => {
      assert(hmacKey instanceof ServiceObject);
      const ctorArg = serviceObjectSpy.firstCall.args[0];
      assert(ctorArg.parent, STORAGE);
      assert(ctorArg.id, ACCESS_ID);
      assert(ctorArg.baseUrl, '/projects/my-project/hmacKeys');
      assert.deepStrictEqual(ctorArg.methods, {
        delete: true,
        get: true,
        getMetadata: true,
        setMetadata: {
          reqOpts: {
            method: 'PUT',
          },
        },
      });
    });

    it('should form baseUrl using options.projectId if given', () => {
      hmacKey = new HmacKey(STORAGE, ACCESS_ID, {projectId: 'another-project'});
      const ctorArg = serviceObjectSpy.firstCall.args[0];
      assert(ctorArg.baseUrl, '/projects/another-project/hmacKeys');
    });
  });
});
