/**
 * Post-processor handler to wrap the result as Proxy.
 * @implements TeqFw_Di_Api_Container_PostProcessor_Chunk
 */
export default class TeqFw_Core_Shared_App_Di_PostProcessor_Proxy {
    /**
     * @param {TeqFw_Di_Api_Container} container
     * @param {TeqFw_Core_Shared_Defaults} DEF
     */
    constructor(
        {
            container,
            TeqFw_Core_Shared_Defaults$: DEF,
        }
    ) {
        // VARS
        /**
         * The map to save wrapping instructions.
         * Sample: {Ns_To_Wrap:'Ns_Wrapper', ...}
         * @type {Object<string, string>}
         */
        const map = {};

        // INSTANCE METHODS
        /**
         * Add a namespace mapping for ES6 modules.
         *
         * @param {string} orig ('Ns_To_Wrap')
         * @param {string} wrapper ('Ns_Wrapper')
         */
        this.map = function (orig, wrapper) {
            map[orig] = wrapper;
        };

        this.modify = function (obj, originalId, stack) {
            let res = obj;
            if (map[originalId]) console.log(`Found!`);
            return res;
        };
    }

}