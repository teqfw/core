/**
 * Go through plugins hierarchy (down to top) and run finalization functions.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class TeqFw_Core_Back_App_A_Stop_Plugins {
    /**
     * @param {TeqFw_Di_Api_Container} container
     * @param {TeqFw_Core_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     */
    constructor(
        {
            container,
            TeqFw_Core_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Logger$$: logger, // inject the implementation
        }
    ) {
        /**
         * @param {TeqFw_Core_Back_Api_Plugin_Registry} plugins
         * @return {Promise<void>}
         */
        this.act = async function ({plugins}) {
            const items = plugins.getItemsByLevels();
            for (const item of items) {
                /** @type {TeqFw_Core_Back_Plugin_Dto_Desc.Dto} */
                const desc = item.teqfw[DEF.SHARED.NAME];
                if (desc?.plugin?.onStop) {
                    const es6 = desc.plugin.onStop;
                    try {
                        const fn = await container.get(`${es6}$$`); // new instance, we don't need these objects more
                        if (typeof fn === 'function') {
                            try {
                                logger.info(`Stopping the '${item.name}' plugin...`);
                                await fn();
                            } catch (e) {
                                logger.error(`Cannot run the plugin stop function for '${es6}'. `
                                    + `Error: ${e.message}`);
                            }
                        }
                    } catch (e) {
                        logger.error(`Cannot create the plugin stop function using the '${es6}' factory. `
                            + `Error: ${e.message}`);
                    }
                }
            }
        };
    }
}