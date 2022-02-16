/**
 * Plugin initialization function.
 */
// MODULE'S IMPORT
import {v4} from 'uuid';

// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Plugin_Init';

export default function (spec) {
    // DEPS
    /** @type {TeqFw_Core_Back_Defaults} */
    const DEF = spec['TeqFw_Core_Back_Defaults$'];
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {TeqFw_Core_Back_Mod_App_Uuid} */
    const mUuid = spec['TeqFw_Core_Back_Mod_App_Uuid$'];

    // MAIN
    logger.setNamespace(NS);

    // ENCLOSED FUNCS
    async function action() {
        // ENCLOSED FUNCS
        /**
         * Load UUID from local config or generate new one.
         * @param {TeqFw_Core_Back_Config} config
         */
        function initAppBackUuid(config) {
            /** @type {TeqFw_Core_Back_Api_Dto_Config_Local} */
            const cfg = config.getLocal(DEF.SHARED.NAME);
            const uuid = (cfg?.uuid) ? cfg.uuid : v4();
            mUuid.set(uuid);
            logger.info(`Backend application UUID: ${mUuid.get()}.`);
        }

        // MAIN
        debugger
        initAppBackUuid(config);
    }

    // MAIN
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});
    return action;
}
