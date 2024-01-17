/**
 * Plugin initialization function.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Plugin_Init';

// MODULE'S FUNCS
/**
 * @param {TeqFw_Core_Shared_Logger_Base} loggerBase
 * @param {TeqFw_Core_Shared_Api_Logger_Transport} transport
 * @param {TeqFw_Core_Back_Mod_App_Uuid} modUuid
 */
export default function (
    {
        TeqFw_Core_Shared_Logger_Base$: loggerBase,
        TeqFw_Core_Shared_Api_Logger_Transport$: transport,
        TeqFw_Core_Back_Mod_App_Uuid$: modUuid,
    }
) {
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
