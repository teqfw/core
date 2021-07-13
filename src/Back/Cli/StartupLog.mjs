/**
 * Print out startup logs.
 *
 * @namespace TeqFw_Core_Back_Cli_StartupLog
 */
// DEFINE WORKING VARS
const NS = 'TeqFw_Core_Back_Cli_StartupLog';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf TeqFw_Core_Back_Cli_StartupLog
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Core_Back_Defaults} */
    const DEF = spec['TeqFw_Core_Back_Defaults$'];
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {Function|TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command#Factory$'];

    // DEFINE INNER FUNCTIONS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf TeqFw_Core_Back_Cli_StartupLog
     */
    const action = async function () {
        logger.pause(false);
        logger.info('All core logs are printed out.');
    };
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'startup-logs';
    res.desc = 'Print out startup logs from the application core.';
    res.action = action;
    return res;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
