/**
 * Plugin level constants (hardcoded configuration).
 */
export default class TeqFw_Core_Back_Defaults {

    CLI_PREFIX = 'core'; // prefix in CLI commands
    DESC_NODE = 'core'; // plugin's node in 'teqfw.json' & './cfg/local.json'
    /** @type {TeqFw_Di_Back_Defaults} */
    MOD_DI;
    PATH_CFG_LOCAL = './cfg/local.json';

    constructor(spec) {
        // EXTRACT DEPS
        this.MOD_DI = spec['TeqFw_Di_Back_Defaults$'];

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
