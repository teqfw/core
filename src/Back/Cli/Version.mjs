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
 * @param {TeqFw_Core_Back_Defaults} DEF
 * @param {TeqFw_Core_Back_Config} config
 * @param {TeqFw_Core_Back_Api_Dto_Command.Factory} fCommand
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf TeqFw_Core_Back_Cli_Version
 */
export default function Factory(
    {
        TeqFw_Core_Back_Defaults$: DEF,
        TeqFw_Core_Back_Config$: config,
        'TeqFw_Core_Back_Api_Dto_Command.Factory$': fCommand,
    }
) {
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
    res.desc = 'get version of the application';
    res.action = action;
    return res;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
