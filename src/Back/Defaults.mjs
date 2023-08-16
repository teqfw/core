/**
 * Plugin level constants (hardcoded configuration).
 */
export default class TeqFw_Core_Back_Defaults {

    AREA = 'back'; // DI area for backend
    CLI_PREFIX = 'core'; // prefix in CLI commands
    FILE_UUID = 'cfg/local.uuid.txt';
    /** @type {TeqFw_Di_Back_Defaults} */
    MOD_DI;
    /** @deprecated use TeqFw_Core_Shared_Defaults.NAME */
    NAME = '@teqfw/core'; // plugin's node in 'teqfw.json' & './cfg/local.json'
    PATH_CFG_LOCAL = './cfg/local.json';
    /** @type {TeqFw_Core_Shared_Defaults} */
    SHARED;

    /**
     * @param {TeqFw_Di_Back_Defaults} MOD_DI
     * @param {TeqFw_Core_Shared_Defaults} SHARED
     */
    constructor(
        {
            TeqFw_Di_Back_Defaults$: MOD_DI,
            TeqFw_Core_Shared_Defaults$: SHARED,
        }
    ) {
        // DEPS
        this.MOD_DI = MOD_DI;
        this.SHARED = SHARED;

        // MAIN
        Object.freeze(this);
    }
}
