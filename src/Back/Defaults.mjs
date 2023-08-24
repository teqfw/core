/**
 * Plugin level constants (hardcoded configuration).
 */
export default class TeqFw_Core_Back_Defaults {

    AREA = 'back'; // DI area for backend
    CLI_PREFIX = 'core'; // prefix in CLI commands
    FILE_UUID = 'cfg/local.uuid.txt';
    PATH_CFG_LOCAL = './cfg/local.json';
    /** @type {TeqFw_Core_Shared_Defaults} */
    SHARED;

    /**
     * @param {TeqFw_Core_Shared_Defaults} SHARED
     */
    constructor(
        {
            TeqFw_Core_Shared_Defaults$: SHARED,
        }
    ) {
        // DEPS
        this.SHARED = SHARED;

        // MAIN
        Object.freeze(this);
    }
}
