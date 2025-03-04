
//




import {Metadata, ServiceObject, Methods} from '@google-cloud/common';
import {Storage} from './storage';

export interface HmacKeyOptions {
  projectId?: string;
}

export interface HmacKeyMetadata {
  accessId: string;
  etag?: string;
  id?: string;
  projectId?: string;
  serviceAccountEmail?: string;
  state?: string;
  timeCreated?: string;
  updated?: string;
}

export interface SetHmacKeyMetadataOptions {
  /**
   * This parameter is currently ignored.
   */
  userProject?: string;
}

export interface SetHmacKeyMetadata {
  state?: 'ACTIVE' | 'INACTIVE';
  etag?: string;
}

export interface HmacKeyMetadataCallback {
  (err: Error | null, metadata?: HmacKeyMetadata, apiResponse?: Metadata): void;
}

export type HmacKeyMetadataResponse = [HmacKeyMetadata, Metadata];

/**
 * The API-formatted resource description of the HMAC key.
 *
 * Note: This is not guaranteed to be up-to-date when accessed. To get the
 * latest record, call the `getMetadata()` method.
 *
 * @name HmacKey#metadata
 * @type {object}
 */
/**
 * An HmacKey object contains metadata of an HMAC key created from a
 * service account through the {@link Storage} client using
 * {@link Storage#createHmacKey}.
 *
 * @see [HMAC keys documentation]{@link https://cloud.google.com/storage/docs/authentication/hmackeys}
 *
 * @class
 */
export class HmacKey extends ServiceObject<HmacKeyMetadata | undefined> {
  metadata: HmacKeyMetadata | undefined;

  /**
   * @typedef {object} HmacKeyOptions
   * @property {string} [projectId] The project ID of the project that owns
   *     the service account of the requested HMAC key. If not provided,
   *     the project ID used to instantiate the Storage client will be used.
   */
  /**
   * Constructs an HmacKey object.
   *
   * Note: this only create a local reference to an HMAC key, to create
   * an HMAC key, use {@link Storage#createHmacKey}.
   *
   * @param {Storage} storage The Storage instance this HMAC key is
   *     attached to.
   * @param {string} accessId The unique accessId for this HMAC key.
   * @param {HmacKeyOptions} options Constructor configurations.
   * @example
   * const {Storage} = require('@google-cloud/storage');
   * const storage = new Storage();
   * const hmacKey = storage.hmacKey('access-id');
   */
  constructor(storage: Storage, accessId: string, options?: HmacKeyOptions) {
    const methods = {
      /**
       * @typedef {object} DeleteHmacKeyOptions
       * @property {string} [userProject] This parameter is currently ignored.
       */
      /**
       * @typedef {array} DeleteHmacKeyResponse
       * @property {object} 0 The full API response.
       */
      /**
       * @callback DeleteHmacKeyCallback
       * @param {?Error} err Request error, if any.
       * @param {object} apiResponse The full API response.
       */
      /**
       * Deletes an HMAC key.
       * Key state must be set to `INACTIVE` prior to deletion.
       * Caution: HMAC keys cannot be recovered once you delete them.
       *
       * The authenticated user must have `storage.hmacKeys.delete` permission for the project in which the key exists.
       *
       * @method HmacKey#delete
       * @param {DeleteHmacKeyOptions} [options] Configuration options.
       * @param {DeleteHmacKeyCallback} [callback] Callback function.
       * @returns {Promise<DeleteHmacKeyResponse>}
       *
       * @example
       * const {Storage} = require('@google-cloud/storage');
       * const storage = new Storage();
       *
       * //-
       * // Delete HMAC key after making the key inactive.
       * //-
       * const hmacKey = storage.hmacKey('ACCESS_ID');
       * hmacKey.setMetadata({state: 'INACTIVE'}, (err, hmacKeyMetadata) => {
       *     if (err) {
       *       // The request was an error.
       *       console.error(err);
       *       return;
       *     }
       *     hmacKey.delete((err) => {
       *       if (err) {
       *         console.error(err);
       *         return;
       *       }
       *       // The HMAC key is deleted.
       *     });
       *   });
       *
       * //-
       * // If the callback is omitted, a promise is returned.
       * //-
       * const hmacKey = storage.hmacKey('ACCESS_ID');
       * hmacKey
       *   .setMetadata({state: 'INACTIVE'})
       *   .then(() => {
       *     return hmacKey.delete();
       *   });
       */
      delete: true,
      /**
       * @callback GetHmacKeyCallback
       * @param {?Error} err Request error, if any.
       * @param {HmacKey} hmacKey this {@link HmacKey} instance.
       * @param {object} apiResponse The full API response.
       */
      /**
       * @typedef {array} GetHmacKeyResponse
       * @property {HmacKey} 0 This {@link HmacKey} instance.
       * @property {object} 1 The full API response.
       */
      /**
       * @typedef {object} GetHmacKeyOptions
       * @property {string} [userProject] This parameter is currently ignored.
       */
      /**
       * Retrieves and populate an HMAC key's metadata, and return
       * this {@link HmacKey} instance.
       *
       * HmacKey.get() does not give the HMAC key secret, as
       * it is only returned on creation.
       *
       * The authenticated user must have `storage.hmacKeys.get` permission
       * for the project in which the key exists.
       *
       * @method HmacKey#get
       * @param {GetHmacKeyOptions} [options] Configuration options.
       * @param {GetHmacKeyCallback} [callback] Callback function.
       * @returns {Promise<GetHmacKeyResponse>}
       *
       * @example
       * const {Storage} = require('@google-cloud/storage');
       * const storage = new Storage();
       *
       * //-
       * // Get the HmacKey's Metadata.
       * //-
       * storage.hmacKey('ACCESS_ID')
       *   .get((err, hmacKey) => {
       *     if (err) {
       *       // The request was an error.
       *       console.error(err);
       *       return;
       *     }
       *     // do something with the returned HmacKey object.
       *   });
       *
       * //-
       * // If the callback is omitted, a promise is returned.
       * //-
       * storage.hmacKey('ACCESS_ID')
       *   .get()
       *   .then((data) => {
       *     const hmacKey = data[0];
       *   });
       */
      get: true,
      /**
       * @typedef {object} GetHmacKeyMetadataOptions
       * @property {string} [userProject] This parameter is currently ignored.
       */
      /**
       * Retrieves and populate an HMAC key's metadata, and return
       * the HMAC key's metadata as an object.
       *
       * HmacKey.getMetadata() does not give the HMAC key secret, as
       * it is only returned on creation.
       *
       * The authenticated user must have `storage.hmacKeys.get` permission
       * for the project in which the key exists.
       *
       * @method HmacKey#getMetadata
       * @param {GetHmacKeyMetadataOptions} [options] Configuration options.
       * @param {HmacKeyMetadataCallback} [callback] Callback function.
       * @returns {Promise<HmacKeyMetadataResponse>}
       *
       * @example
       * const {Storage} = require('@google-cloud/storage');
       * const storage = new Storage();
       *
       * //-
       * // Get the HmacKey's metadata and populate to the metadata property.
       * //-
       * storage.hmacKey('ACCESS_ID')
       *   .getMetadata((err, hmacKeyMetadata) => {
       *     if (err) {
       *       // The request was an error.
       *       console.error(err);
       *       return;
       *     }
       *     console.log(hmacKeyMetadata);
       *   });
       *
       * //-
       * // If the callback is omitted, a promise is returned.
       * //-
       * storage.hmacKey('ACCESS_ID')
       *   .getMetadata()
       *   .then((data) => {
       *     const hmacKeyMetadata = data[0];
       *     console.log(hmacKeyMetadata);
       *   });
       */
      getMetadata: true,
      /**
       * @typedef {object} SetHmacKeyMetadata Subset of {@link HmacKeyMetadata} to update.
       * @property {string} state New state of the HmacKey. Either 'ACTIVE' or 'INACTIVE'.
       * @property {string} [etag] Include an etag from a previous get HMAC key request
       *    to perform safe read-modify-write.
       */
      /**
       * @typedef {object} SetHmacKeyMetadataOptions
       * @property {string} [userProject] This parameter is currently ignored.
       */
      /**
       * @callback HmacKeyMetadataCallback
       * @param {?Error} err Request error, if any.
       * @param {HmacKeyMetadata} metadata The updated {@link HmacKeyMetadata} object.
       * @param {object} apiResponse The full API response.
       */
      /**
       * @typedef {array} HmacKeyMetadataResponse
       * @property {HmacKeyMetadata} 0 The updated {@link HmacKeyMetadata} object.
       * @property {object} 1 The full API response.
       */
      /**
       * Updates the state of an HMAC key. See {@link SetHmacKeyMetadata} for
       * valid states.
       *
       * @method HmacKey#setMetadata
       * @param {SetHmacKeyMetadata} metadata The new metadata.
       * @param {SetHmacKeyMetadataOptions} [options] Configuration options.
       * @param {HmacKeyMetadataCallback} [callback] Callback function.
       * @returns {Promise<HmacKeyMetadataResponse>}
       *
       * @example
       * const {Storage} = require('@google-cloud/storage');
       * const storage = new Storage();
       *
       * const metadata = {
       *   state: 'INACTIVE',
       * };
       *
       * storage.hmacKey('ACCESS_ID')
       *   .setMetadata(metadata, (err, hmacKeyMetadata) => {
       *     if (err) {
       *       // The request was an error.
       *       console.error(err);
       *       return;
       *     }
       *     console.log(hmacKeyMetadata);
       *   });
       *
       * //-
       * // If the callback is omitted, a promise is returned.
       * //-
       * storage.hmacKey('ACCESS_ID')
       *   .setMetadata(metadata)
       *   .then((data) => {
       *     const hmacKeyMetadata = data[0];
       *     console.log(hmacKeyMetadata);
       *   });
       */
      setMetadata: {
        reqOpts: {
          method: 'PUT',
        },
      },
    } as Methods;

    const projectId = (options && options.projectId) || storage.projectId;

    super({
      parent: storage,
      id: accessId,
      baseUrl: `/projects/${projectId}/hmacKeys`,
      methods,
    });
  }
}
