/**
 * Frontend gate to "Load i18n resources" service.
 * @namespace TeqFw_Core_App_Front_Gate_Load_I18n
 */

// DEFINE WORKING VARS
const NS = 'TeqFw_Core_App_Front_Gate_Load_I18n';

/**
 * Factory to create frontend gate to 'Load i18n resources' service.
 * Use as "const gate = spec['Fl32_Bwl_Front_Gate_Load_I18n$']".
 * @namespace Fl32_Bwl_Front_Gate_Load_I18n
 */
function Factory(spec) {
    /** @type {TeqFw_Core_App_Defaults} */
    const DEF = spec['TeqFw_Core_App_Defaults$'];   // instance singleton
    /** @type {TeqFw_Core_App_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Core_App_Front_Gate_Connect$']; // instance singleton
    /** @type {typeof TeqFw_Core_App_Shared_Service_Route_Load_I18n_Response} */
    const Response = spec['TeqFw_Core_App_Shared_Service_Route_Load_I18n#Response']; // class constructor

    // DEFINE INNER FUNCTIONS
    /**
     * @param {TeqFw_Core_App_Shared_Service_Route_Load_I18n_Request} data
     * @returns {Promise<TeqFw_Core_App_Shared_Service_Route_Load_I18n_Response|TeqFw_Core_App_Front_Gate_Response_Error>}
     * @memberOf TeqFw_Core_App_Front_Gate_Load_I18n
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.API_LOAD_I18N);
        if (res) {
            result = Object.assign(new Response(), res);
        }
        return result;
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(gate, 'name', {value: `${NS}.${gate.name}`});

    // COMPOSE RESULT
    return gate;
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});

// MODULE'S EXPORT
export default Factory;
