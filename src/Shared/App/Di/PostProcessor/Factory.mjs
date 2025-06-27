/**
 * Post-processor handler to wrap the result as Factory.
 * @implements TeqFw_Di_Api_Container_PostProcessor_Chunk
 */
export default class TeqFw_Core_Shared_App_Di_PostProcessor_Factory {
    /**
     * @param {TeqFw_Di_Container} container
     * @param {TeqFw_Core_Shared_Defaults} DEF
     */
    constructor(
        {
            container,
            TeqFw_Core_Shared_Defaults$: DEF,
        }
    ) {

        this.modify = function (obj, originalId, stack) {
            let res = obj;
            if (originalId.wrappers.includes(DEF.DI_WRAP_PROXY)) {
                res = new Proxy({dep: undefined, objectKey: originalId}, {
                    get: async function (base, name) {
                        if (name === 'create') base.dep = await container.get(base.objectKey.value);
                        return base.dep;
                    }
                });
            }
            return res;
        };
    }

}