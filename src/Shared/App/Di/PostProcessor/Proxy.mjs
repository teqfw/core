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
         * Sample: {Ns_To_Wrap:['Ns_Wrapper', 'Ns_Wrapper2', ...]}
         * @type {Object<string, string[]>}
         */
        const map = {};

        // INSTANCE METHODS
        /**
         * Add a namespace mapping for ES6 modules.
         *
         * @param {string} orig ('Ns_To_Wrap')
         * @param {string} wrapper ('Ns_Wrapper')
         * @param {string} module ('Ns_Wrapper')
         */
        this.map = function (orig, wrapper, module) {
            if (!map[orig]) map[orig] = [];
            map[orig].push(wrapper);
        };

        this.modify = async function (obj, originalId, stack) {
            let res = obj;
            const modOrig = originalId.moduleName;
            if (map[modOrig]) {
                // there are proxies for the original object
                for (const modReplace of map[modOrig]) {
                    const wrapId = originalId.value.replace(modOrig, modReplace);
                    /** @type {TeqFw_Core_Shared_Api_Di_Proxy} */
                    const wrapper = await container.get(wrapId);
                    res = wrapper.wrapOrigin(res);
                }
            }
            return res;
        };
    }

}