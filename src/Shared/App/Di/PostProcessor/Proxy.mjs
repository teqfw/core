/**
 * Post-processor handler to wrap the result as Proxy.
 * @implements TeqFw_Di_Api_Container_PostProcessor_Chunk
 */
export default class TeqFw_Core_Shared_App_Di_PostProcessor_Proxy {
    /**
     * @param {TeqFw_Di_Api_Container} container
     */
    constructor(
        {
            container,
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

        this.modify = async function (obj, originalId, stack) {
            let res = obj;
            const modOrig = originalId.moduleName;
            if (map[modOrig]) {
                const wrapId = originalId.value.replace(modOrig, map[modOrig]);
                const wrapper = await container.get(wrapId);
                wrapper.setOrigin(obj);
                res = wrapper;
            }
            return res;
        };
    }

}