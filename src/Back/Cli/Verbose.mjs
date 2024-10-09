/**
 * Display startup log messages in the console.
 *
 * @namespace TeqFw_Core_Back_Cli_Verbose
 */
// DEFINE WORKING VARS
const NS = 'TeqFw_Core_Back_Cli_Verbose';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Core_Back_Defaults} DEF
 * @param {TeqFw_Core_Back_Config} config
 * @param {TeqFw_Core_Back_Api_Dto_Command.Factory} fCommand
 * @param {TeqFw_Core_Shared_Logger_Base} loggerBase
 * @param {TeqFw_Core_Shared_Api_Logger_Transport} transport
 *
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf TeqFw_Core_Back_Cli_Verbose
 */
export default function Factory(
    {
        TeqFw_Core_Back_Defaults$: DEF,
        TeqFw_Core_Back_Config$: config,
        'TeqFw_Core_Back_Api_Dto_Command.Factory$': fCommand,
        TeqFw_Core_Shared_Logger_Base$: loggerBase,
        TeqFw_Core_Shared_Api_Logger_Transport$: transport,
    }
) {
    // FUNCS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf TeqFw_Core_Back_Cli_Verbose
     */
    const action = async function () {
        loggerBase.setTransport(transport);
    };
    Object.defineProperty(action, 'namespace', {value: NS});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'verbose';
    res.desc = 'display startup log messages in the console';
    res.action = action;
    return res;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
