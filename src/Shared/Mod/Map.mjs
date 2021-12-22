/**
 * Simple map to set/get objects by filepath-like key (`@teqfw/web/path/to/attr`).
 * All 'paths' are absolute, '/path/to/obj' equals to 'path/to/obj'.
 *
 * TODO: plain keys are used currently, add hierarchy later if it will be required (debug a lot of objects in the store).
 */
export default class TeqFw_Core_Shared_Mod_Map {

    constructor() {
        // DEFINE WORKING VARS / PROPS
        const store = {}; // don't use privates, they are invisible in IDEA debugger

        // DEFINE INSTANCE METHODS
        /**
         * Get some data by filepath-like key.
         * @param {Object} key
         * @return {*}
         */
        this.get = function (key) {
            return store[key];
        }

        /**
         * Set some data by filepath-like key.
         * @param key
         * @param data
         */
        this.set = function (key, data) {
            store[key] = data;
        }
    }
}
