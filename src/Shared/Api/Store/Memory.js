/**
 * @template T
 * Interface for in-memory storage.
 * Designed for dynamic module binding and runtime flexibility.
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Store_Memory {
    /**
     * Saves data with a unique key and expiration time.
     * @param {Object} params
     * @param {string} params.key - Unique key identifier.
     * @param {T} params.data - Data to store.
     * @param {number} params.expiresAt - Expiration timestamp.
     * @returns {void}
     */
    set({key, data, expiresAt}) {}

    /**
     * Retrieves data by a unique key.
     * @param {Object} params
     * @param {string} params.key - Unique key identifier.
     * @returns {T|null} - Retrieved data or null if not found/expired.
     */
    get({key}) {}

    /**
     * Deletes data by a unique key.
     * @param {Object} params
     * @param {string} params.key - Unique key identifier.
     * @returns {void}
     */
    delete({key}) {}
}
