
//




import {Metadata, ServiceObject, util} from '@google-cloud/common';
import {promisifyAll} from '@google-cloud/promisify';

import {Storage} from './storage';

export interface StopCallback {
  (err: Error | null, apiResponse?: Metadata): void;
}

/**
 * Create a channel object to interact with a Cloud Storage channel.
 *
 * @see [Object Change Notification]{@link https://cloud.google.com/storage/docs/object-change-notification}
 *
 * @class
 *
 * @param {string} id The ID of the channel.
 * @param {string} resourceId The resource ID of the channel.
 *
 * @example
 * const {Storage} = require('@google-cloud/storage');
 * const storage = new Storage();
 * const channel = storage.channel('id', 'resource-id');
 */
class Channel extends ServiceObject {
  constructor(storage: Storage, id: string, resourceId: string) {
    const config = {
      parent: storage,
      baseUrl: '/channels',

      // An ID shouldn't be included in the API requests.
      // RE:
      // https://github.com/GoogleCloudPlatform/google-cloud-node/issues/1145
      id: '',

      methods: {
        // Only need `request`.
      },
    };

    super(config);

    // TODO: remove type cast to any once ServiceObject's type declaration has
    // been fixed. https://github.com/googleapis/nodejs-common/issues/176
    const metadata = this.metadata;
    metadata.id = id;
    metadata.resourceId = resourceId;
  }

  stop(): Promise<Metadata>;
  stop(callback: StopCallback): void;
  /**
   * @typedef {array} StopResponse
   * @property {object} 0 The full API response.
   */
  /**
   * @callback StopCallback
   * @param {?Error} err Request error, if any.
   * @param {object} apiResponse The full API response.
   */
  /**
   * Stop this channel.
   *
   * @param {StopCallback} [callback] Callback function.
   * @returns {Promise<StopResponse>}
   *
   * @example
   * const {Storage} = require('@google-cloud/storage');
   * const storage = new Storage();
   * const channel = storage.channel('id', 'resource-id');
   * channel.stop(function(err, apiResponse) {
   *   if (!err) {
   *     // Channel stopped successfully.
   *   }
   * });
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * channel.stop().then(function(data) {
   *   const apiResponse = data[0];
   * });
   */
  stop(callback?: StopCallback): Promise<Metadata> | void {
    callback = callback || util.noop;
    this.request(
      {
        method: 'POST',
        uri: '/stop',
        json: this.metadata,
      },
      (err, apiResponse) => {
        callback!(err, apiResponse);
      }
    );
  }
}

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
promisifyAll(Channel);

/**
 * Reference to the {@link Channel} class.
 * @name module:@google-cloud/storage.Channel
 * @see Channel
 */
export {Channel};
