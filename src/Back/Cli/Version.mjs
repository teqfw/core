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
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf TeqFw_Core_Back_Cli_Version
 */
export default function Factory(spec) {
    // DEPS
    /** @type {TeqFw_Core_Back_Defaults} */
    const DEF = spec['TeqFw_Core_Back_Defaults$'];
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command.Factory$'];

    // FUNCS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf TeqFw_Core_Back_Cli_Version
     */
    const action = async function () {
        console.log(`Application version: ${config.getVersion()}.`);
    };
    Object.defineProperty(action, 'namespace', {value: NS});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'version';
    res.desc = 'get version of the application.';
    res.action = action;
    return res;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
