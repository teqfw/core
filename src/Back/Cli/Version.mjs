/**
 * Get application version.
 *
 * @namespace TeqFw_Core_Back_Cli_Version
 */
// DEFINE WORKING VARS
const NS = 'TeqFw_Core_Back_Cli_Version';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Di_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf TeqFw_Core_Back_Cli_Version
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Core_Back_Defaults} */
    const DEF = spec['TeqFw_Core_Back_Defaults$']; // singleton
    /** @type {TeqFw_Core_Back_App.Bootstrap} */
    const cfg = spec['TeqFw_Core_Back_App#Bootstrap$']; // singleton
    /** @type {Function|TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command#Factory$']; // singleton

    // DEFINE INNER FUNCTIONS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf TeqFw_Core_Back_Cli_Version
     */
    const action = async function () {
        console.log(`Application version: ${cfg.version}.`);
    };
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = DEF.REALM;
    res.name = 'version';
    res.desc = 'Get version of the application.';
    res.action = action;
    return res;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
