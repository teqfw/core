/**
 * Post-processor handler to add namespace of the host object into logger before injection.
 * @implements TeqFw_Di_Api_Container_PostProcessor_Chunk
 */
export default class TeqFw_Core_Shared_App_Di_PostProcessor_Logger {
    /**
     * @param {TeqFw_Di_Api_Container} container
     * @param {TeqFw_Core_Shared_Defaults} DEFS
     */
    constructor(
        {
            container,
            TeqFw_Core_Shared_Defaults$: DEFS,
        }
    ) {

        this.modify = function (obj, originalId, stack) {
            /** @type {TeqFw_Core_Shared_Logger} */
            let res = obj;
            if (
                (
                    (originalId.moduleName === 'TeqFw_Core_Shared_Api_Logger')  // interface
                    || (originalId.moduleName === 'TeqFw_Core_Shared_Logger')   // default implementation
                ) && (originalId.life === DEFS.DI_LIFE_INSTANCE)
            ) {
                // get depId for the parent
                const parentId = stack[stack.length - 1];
                if (typeof parentId === 'string') {
                    // extract module name (namespace)
                    const dto = container.getParser().parse(parentId);
                    res.setNamespace(dto.moduleName);
                }
            }
            return res;
        };
    }

}