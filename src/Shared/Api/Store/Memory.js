/**
 * Interface for in-memory storage with expiration support.
 * This defines the contract for implementations to follow.
 *
 * @template T
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Store_Memory {

    /**
     * Removes expired items from memory.
     * Implementations should periodically call this to maintain storage integrity.
     *
     * @returns {void}
     */
    cleanup() {}

    /**
     * Removes a data entry by its unique key.
     *
     * @param {Object} params
     * @param {string} params.key - Unique key identifier.
     * @returns {boolean} - True if the entry existed and was removed, false otherwise.
     */
    delete({key}) {}

    /**
     * Retrieves data by a unique key.
     *
     * @param {Object} params
     * @param {string} params.key - Unique key identifier.
     * @returns {T|null} - The stored data, or null if not found or expired.
     */
    get({key}) {}

    /**
     * Checks if a given key exists in the store.
     *
     * @param {Object} params
     * @param {string} params.key - Unique key identifier.
     * @returns {boolean} - True if the key exists and is not expired, false otherwise.
     */
    has({key}) {}

    /**
     * Saves data with a unique key and optional expiration time.
     * Implementations should enforce max size constraints.
     *
     * If both `expiresAt` and `lifetime` are provided, `expiresAt` takes precedence.
     * If only `lifetime` is provided, the expiration time is calculated as `Date.now() + lifetime`.
     * If neither `expiresAt` nor `lifetime` is provided, the data does not expire.
     *
     * @param {Object} params
     * @param {string} params.key - Unique key identifier.
     * @param {T} params.data - Data to store.
     * @param {number} [params.expiresAt] - Expiration timestamp (UNIX time in milliseconds).
     * @param {number} [params.lifetime] - Lifetime in milliseconds from now.
     * @returns {void}
     */
    set({key, data, expiresAt, lifetime}) {}

}
