/**
 * Plugin initialization function.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Plugin_Init';

// MODULE'S FUNCS
export default function (spec) {
    // DEPS
    /** @type {TeqFw_Core_Shared_Logger_Base} */
    const loggerBase = spec['TeqFw_Core_Shared_Logger_Base$'];
    /** @type {TeqFw_Core_Shared_Api_Logger_Transport} */
    const transport = spec['TeqFw_Core_Shared_Api_Logger_Transport$'];
    /** @type {TeqFw_Core_Back_Mod_App_Uuid} */
    const modUuid = spec['TeqFw_Core_Back_Mod_App_Uuid$'];

    // FUNCS
    async function action() {
        // set transport implementation after plugins being loaded (DI rewrites)
        loggerBase.setTransport(transport);
        // backend UUID
        await modUuid.init();
    }

    // MAIN
    Object.defineProperty(action, 'namespace', {value: NS});
    return action;
}
